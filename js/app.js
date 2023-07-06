$(function() {
    prepareDungeonClearsTables();
    preparePokemonStatsTable();
});

document.getElementById('btn-select-file').addEventListener('click', () => {
    fileSelector.click();
});

const fileSelector = document.getElementById('file-selector');
const fr = new FileReader();

fileSelector.addEventListener('change', () => {
    fr.readAsText(fileSelector.files[0]);
});

fr.onload = () => {
    loadSave(fr.result);
};

function loadSave(data) {
    const saveData = parseSaveData(data);
    if (!saveData.player || !saveData.save) {
        alert('Invalid Save Data');
        return;
    }

    if (saveData.save.profile.name.toLowerCase() == 'bailey') {
        alert('Welcome back, Bailey! We missed you. Enjoy your stay.');
    }

    checkPokemon(saveData);
    loadPokemonStats(saveData);
    loadDungeonClears(saveData);

    document.getElementById('saveInfoCard').classList.remove('d-none');
}

function parseSaveData(saveData) {
    return JSON.parse(atob(saveData));
}

function prepareDungeonClearsTables() {
    const placeholderTable = document.getElementById('dungeonClearsPlaceholderTable');
    const baseTable = placeholderTable.cloneNode(true);
    const baseRow = placeholderTable.querySelector('tbody tr.dungeon-clears-row').cloneNode(true);

    baseTable.removeAttribute('id');
    baseTable.querySelector('tbody tr.dungeon-clears-row').remove();
    placeholderTable.remove();

    for (let i = 0, id = 0; i < _dungeonList.length; i++) {
        const table = baseTable.cloneNode(true);
        table.dataset.region = _dungeonList[i].region;
        table.querySelector('thead span.region-name').innerText = _dungeonList[i].name;
        table.querySelector('thead .collapse-button').dataset.bsTarget = `#dungeon-clears-collapse-${i}`;
        table.querySelector('tbody').setAttribute('id', `dungeon-clears-collapse-${i}`);

        for (let j = 0; j < _dungeonList[i].dungeons.length; j += 2) {
            const row = baseRow.cloneNode(true);
            const cells = row.querySelectorAll('td');

            cells[0].innerText = _dungeonList[i].dungeons[j];
            cells[1].innerText = '0';
            cells[1].dataset.dungeonId = id++;

            if (j + 1 < _dungeonList[i].dungeons.length) {
                cells[2].innerText = _dungeonList[i].dungeons[j+1];
                cells[3].innerText = '0';
                cells[3].dataset.dungeonId = id++;
            } else {
                cells[2].innerText = '';
                cells[3].innerText = '';
            }

            table.querySelector('tbody').insertAdjacentElement('beforeend', row);
        }

        if (_dungeonList[i].hidden) {
            table.classList.add('d-none');
            table.dataset.hidden = "1";
        }

        document.getElementById('dungeonClearsContainer').insertAdjacentElement('beforeend', table);
    }
}

function preparePokemonStatsTable() {
    const table = document.getElementById('pokemonStatsTable');
    const baseRow = table.querySelector('tbody tr').cloneNode(true);
    table.querySelector('tbody tr').remove();

    const pokemonList = _obtainablePokemonListFlat.sort((a,b) => a.id - b.id);
    const rows = [];

    pokemonList.forEach(p => {
        const row = baseRow.cloneNode(true);
        row.dataset.id = p.id;
        row.dataset.region = p.region;
        row.dataset.cannotEv = _pokemonThatCannotGetEVs.includes(p.name) ? '1' : '0';
        const cells = row.querySelectorAll('td');
        cells[0].innerText = p.id;
        cells[1].querySelector('.pokemon-name').innerHTML = `${p.name}${p.region == -2 ? '<sup class="text-muted" title="Event/Discord/Client">E</sup>' : ''}`;
        rows.push(row);
    });

    table.querySelector('tbody').append(...rows);
}


function getNativeRegion(p) {
    if (p.nativeRegion) {
        return p.nativeRegion;
    }
    return _maxIdPerRegion.findIndex(i => i >= Math.floor(p.id));
}


function checkPokemon(saveData) {
    const highestRegion = saveData.player.highestRegion;
    const hideAlternateForms = document.getElementById('hideAlternateCheck').checked;
    const showAllRegions = document.getElementById('showAllRegionsCheck').checked;
    const missing = [];
    //let missingCount = 0;

    /*Object.keys(_obtainablePokemonList).forEach(key => {
        const region = _obtainablePokemonList[key];
        if (!showAllRegions && region.id > highestRegion)
            return;

        const r = { region: key, missing: [] };
        region.pokemon.forEach(p => {
            if (hideAlternateForms && p.id % 1)
                return;

            if (!saveData.save.party.caughtPokemon.find(c => c.id == p.id)) {
                r.missing.push(p);
            }
        });

        missing.push(r);
        missingCount += r.missing.length;
    });*/

    Object.keys(_obtainablePokemonList).forEach((key, i) => {
        const region = _obtainablePokemonList[key];
        if (!showAllRegions && region.id > highestRegion)
            return;

        if (region.id == -2 && hideAlternateForms)
            return;

        const pokemon = [];
        let missingCount = 0;

        if (!hideAlternateForms) {
            region.pokemon.forEach(p => {
                if (!saveData.save.party.caughtPokemon.find(c => c.id == p.id)) {
                    pokemon.push(p);
                }
            });
            missingCount = pokemon.length;
        }
        else {
            const uniquePokemon = region.pokemon.reduce((map, p) => {
                const id = Math.floor(+p.id);
                if (getNativeRegion(p) == region.id) {
                    map[id] = map[id] || [];
                    map[id].push(p);
                }
                return map;
            }, {});

            //console.log(uniquePokemon);

            Object.keys(uniquePokemon).forEach(k => {
                const ids = uniquePokemon[k].map(f => f.id);
                if (!ids.some(id => saveData.save.party.caughtPokemon.find(c => c.id == id))) {
                    pokemon.push(...uniquePokemon[k]);
                    missingCount += 1;
                }
            });
        }

        missing.push({ region: key, pokemon: pokemon, missingCount: missingCount });
    });

    const totalMissing = missing.map(m => m.missingCount).reduce((a, b)=> a + b);
    $('#missing-tables').empty();
    $('#missing-table-container').toggleClass('d-none', totalMissing == 0);
    $('#missing-none').toggleClass('d-none', totalMissing > 0);
    $('#missing-pokemon-tab').html('Missing Pokémon' + (totalMissing > 0 ? ` (${totalMissing})` : ''));
    $('#requiredPokemonNotice').toggleClass('d-none', !hideAlternateForms);

    missing.forEach(m => {
        if (m.pokemon.length == 0)
            return;

        var a = $('#placeholder-table').clone().removeClass('d-none');
        $('.card-title', a).text(`${m.region} (${m.missingCount})`);

        var tbody = $('.table tbody', a);
        m.pokemon.sort((a,b) => a.id - b.id);
        m.pokemon.forEach(p => {
            //tbody.append(`<tr><td class="text-center">${p.id}</td><td>${p.name}${p.id % 1 ? '<span class="float-end">*</span>' : ''}</td></tr>`);
            tbody.append(`<tr><td class="text-center">${p.id}</td><td>${p.name}`);
        });

        $('#missing-tables').append(a);
    });
}

function loadPokemonStats(saveData) {
    const hideAlternateForms = document.getElementById('hideAlternateCheck').checked;
    const showAllRegions = document.getElementById('showAllRegionsCheck').checked;

    const pokemonCaptured = saveData.save.statistics.pokemonCaptured;
    const pokemonHatched = saveData.save.statistics.pokemonHatched;
    const shinyCaptured = saveData.save.statistics.shinyPokemonCaptured;
    const shinyHatched = saveData.save.statistics.shinyPokemonHatched;
    const pokemonDefeated = saveData.save.statistics.pokemonDefeated;
    const party = saveData.save.party.caughtPokemon.reduce((map, p) => (map[p.id] = p, map), {});
    const evModifier = saveData.save.challenges.list.slowEVs ? 10 : 1;
    const tbody = document.getElementById('pokemonStatsTable').querySelector('tbody');

    const icon = {
        'Captured': $('<img>', { src: './img/Pokeball.svg', alt: '', title: 'Caught', width: '18px' })[0].outerHTML,
        'CapturedShiny': $('<img>', { src: './img/Pokeball-shiny.svg', alt: '', title: 'Caught Shiny', width: '18px' })[0].outerHTML,
        'Infected': $('<img>', { src: './img/Infected.png', alt: '', title: 'Pokérus Infected', width: '32px' })[0].outerHTML,
        'Contagious': $('<img>', { src: './img/Contagious.png', alt: '', title: 'Pokérus Contagious',  width: '32px' })[0].outerHTML,
        'Resistant': $('<img>', { src: './img/Resistant.png', alt: '', title: 'Pokérus Resistant', width: '32px' })[0].outerHTML
    }

    _obtainablePokemonListFlat.forEach(p => {
        const row = tbody.querySelector(`tr[data-id="${p.id}"]`);

        let region = p.region;
        if (region == -2) {
            // use region of base form for event/discord pokemon
            region = _obtainablePokemonListMap[parseInt(p.id)].region;
        }

        if (/*(hideAlternateForms && p.id % 1) ||*/ (!showAllRegions && region > saveData.player.highestRegion)) {
            row.classList.add('d-none', 'search-ignore');
            return;
        }
        else {
            row.classList.remove('d-none', 'search-ignore');
        }

        const cells  = row.querySelectorAll('td');
        cells[2].innerText = (pokemonCaptured[p.id] || 0).toLocaleString();
        cells[2].dataset.sortVal = pokemonCaptured[p.id] || 0;
        cells[3].innerText = (pokemonHatched[p.id] || 0).toLocaleString();
        cells[3].dataset.sortVal = pokemonHatched[p.id] || 0;
        cells[4].innerText = (shinyCaptured[p.id] || 0).toLocaleString();
        cells[4].dataset.sortVal = shinyCaptured[p.id] || 0;
        cells[5].innerText = (shinyHatched[p.id] || 0).toLocaleString();
        cells[5].dataset.sortVal = shinyHatched[p.id] || 0;
        cells[6].innerText = (pokemonDefeated[p.id] || 0).toLocaleString();
        cells[6].dataset.sortVal = pokemonDefeated[p.id] || 0;

        const ev = Math.floor((party[p.id]?.['9'] || 0) / 1000 / evModifier);
        const evBonus = (ev < 50) ? (1 + 0.01 * ev) : (Math.pow(ev, Math.log(1.5) / Math.log(50)));

        cells[7].innerText = ev.toLocaleString();
        cells[7].dataset.sortVal = ev;
        cells[8].innerText = `x${evBonus.toLocaleString()}`;
        cells[8].dataset.sortVal = evBonus;

        const isCaptured = party[p.id] != undefined;
        const isCapturedShiny = isCaptured ? party[p.id]['5'] || false : false;

        row.dataset.shiny = isCapturedShiny ? "1" : "0";

        const icons = [];
        if (isCaptured) {
            icons.push(icon[(isCapturedShiny ? 'CapturedShiny' : 'Captured')]);
        }

        if (party[p.id]?.['8']) {
            const pkrs = getPokerusStatus(party[p.id]['8']);
            if (pkrs) {
                icons.push(icon[pkrs]);
            }
        }

        row.dataset.pokerus = party[p.id]?.['8'] ?? '0';

        cells[1].querySelector('.icon-container').innerHTML = icons.length ? icons.join('&nbsp;') : '';
    });

    resetPokemonStatTableFilters();
    updatePokemonStatsDisplayCount();
}

function resetPokemonStatTableFilters() {
    $('#pokemonStatTableSearch').val('').trigger('input');
    $('#pokemonStatTableFilter').prop('selectedIndex', 0).trigger('change');
    $('#pokemonStatsTable tbody tr').removeClass('search-hidden filter-hidden');
}

function loadDungeonClears(saveData) {
    const showAllRegions = document.getElementById('showAllRegionsCheck').checked;
    const dungeonsCleared = saveData.save.statistics.dungeonsCleared;

    for (let i = 0; i < dungeonsCleared.length; i++) {
        const cell = document.querySelector(`.dungeon-clears-row td[data-dungeon-id="${i}"]`);
        if (cell) {
            cell.innerText = dungeonsCleared[i];
        }
    }

    document.querySelectorAll('#dungeonClearsContainer table').forEach(t => {
        if (t.dataset.hidden) {
            return;
        }

        const region = +t.dataset.region;
        if (region <= saveData.player.highestRegion || showAllRegions) {
            t.classList.remove('d-none');
        }
        else {
            t.classList.add('d-none');
        }
    });
}

function getPokerusStatus(pkrs) {
    switch (pkrs) {
        case 1:
            return 'Infected';
        case 2:
            return 'Contagious';
        case 3:
            return 'Resistant';
        default:
            return null;
    }
}

document.getElementById('pokemonStatTableSearch').addEventListener('input', e => {
    const val = e.currentTarget.value.toLowerCase();
    if (val.length == 0) {
        $('#pokemonStatsTable tbody tr.search-hidden').removeClass('search-hidden');
    }
    else {
        $('#pokemonStatsTable tbody tr:not(.search-ignore), #pokemonStatsTable tbody tr.search-hidden').each(function() {
            const cells = $(this).find('td').get();
            $(this).toggleClass('search-hidden',
                !(cells[0].innerText.trim().includes(val) || cells[1].innerText.trim().toLowerCase().includes(val)));
        });
    }

    updatePokemonStatsDisplayCount();
});

document.getElementById('pokemonStatTableFilter').addEventListener('change', e => {
    const val = e.currentTarget.value;

    if (val == '-1') {
        $('#pokemonStatsTable tbody tr.filter-hidden').removeClass('filter-hidden');
    }
    else {
        $('#pokemonStatsTable tbody tr:not(.search-ignore), #pokemonStatsTable tbody tr.filter-hidden').each(function() {
            if (val == '0') {
                const isShiny = $(this).data('shiny') == '1';
                $(this).toggleClass('filter-hidden', isShiny);
            }
            else if (val == '1') {
                const isResistant = $(this).data('pokerus') == '3';
                $(this).toggleClass('filter-hidden', isResistant);
            }
            else if (val == '2') {
                const isResistant = $(this).data('pokerus') == '3';
                const canGetEvs = $(this).data('cannot-ev') == '0';
                $(this).toggleClass('filter-hidden', (isResistant || !canGetEvs));
            }
            else if (val == '4') {
                const isResistant = $(this).data('pokerus') == '3';
                const canGetEvs = $(this).data('cannot-ev') == '0';
                $(this).toggleClass('filter-hidden', (isResistant || canGetEvs));
            }
            else if (val == '3') {
                const isResistant = $(this).data('pokerus') == '3';
                $(this).toggleClass('filter-hidden', !isResistant);
            }
        });
    }

    updatePokemonStatsDisplayCount();
});

function updatePokemonStatsDisplayCount() {
    const count = $('#pokemonStatsTable tbody tr:not(.d-none):not([class*="-hidden"])').length;
    $('#pokemon-stats-display-count').text(`Showing ${count} Pokémon`);
}

$(document).on('hidden.bs.collapse shown.bs.collapse', '#dungeon-stats table tbody.collapse', e => {
    const isCollapsed = !e.currentTarget.classList.contains('show');
    e.currentTarget.parentElement.querySelector('thead .collapse-button').innerText = isCollapsed ? '[ Show ]' : '[ Hide ]';
});

const getCellValue = (tr, idx) => tr.children[idx].dataset.sortVal || tr.children[idx].innerText || tr.children[idx].textContent;
const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
document.querySelectorAll('#pokemonStatsTable thead th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table').querySelector('tbody');
    Array.from(table.querySelectorAll('tr'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );
})));