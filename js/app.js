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
        table.dataset.region = i;
        table.querySelector('thead span.region-name').innerText = _regionList[i];
        table.querySelector('thead .collapse-button').dataset.bsTarget = `#dungeon-clears-collapse-${i}`;
        table.querySelector('tbody').setAttribute('id', `dungeon-clears-collapse-${i}`);

        for (let j = 0; j < _dungeonList[i].length; j += 2) {
            const row = baseRow.cloneNode(true);
            const cells = row.querySelectorAll('td');

            cells[0].innerText = _dungeonList[i][j];
            cells[1].innerText = '0';
            cells[1].dataset.dungeonId = id++;

            if (j + 1 < _dungeonList[i].length) {
                cells[2].innerText = _dungeonList[i][j+1];
                cells[3].innerText = '0';
                cells[3].dataset.dungeonId = id++;
            } else {
                cells[2].innerText = '';
                cells[3].innerText = '';
            }

            table.querySelector('tbody').insertAdjacentElement('beforeend', row);
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
        const cells = row.querySelectorAll('td');
        cells[0].innerText = p.id;
        cells[1].querySelector('.pokemon-name').innerHTML = `${p.name}${p.region == -1 ? '<sup class="text-muted" title="Event/Discord">E</sup>' : ''}`;
        rows.push(row);
    });

    table.querySelector('tbody').append(...rows);
}



function checkPokemon(saveData) {
    const highestRegion = saveData.player.highestRegion;
    const hideAlternateForms = document.getElementById('hideAlternateCheck').checked;
    const showAllRegions = document.getElementById('showAllRegionsCheck').checked;
    const missing = [];
    let missingCount = 0;

    Object.keys(_obtainablePokemonList).forEach(key => {
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
    });

    //$('#missing-card').removeClass('d-none');
    $('#missing-tables').empty();
    $('#missing-table-container').toggleClass('d-none', missingCount == 0);
    $('#missing-none').toggleClass('d-none', missingCount > 0);
    $('#missing-pokemon-tab').html('Missing Pokémon' + (missingCount > 0 ? ` (${missingCount})` : ''));

    missing.forEach(m => {
        if (m.missing.length == 0)
            return;

        var a = $('#placeholder-table').clone().removeClass('d-none');
        $('.card-title', a).text(`${m.region} (${m.missing.length})`);

        var tbody = $('.table tbody', a);
        m.missing.sort((a,b) => a.id - b.id);
        m.missing.forEach(p => {
            tbody.append(`<tr><td class="text-center">${p.id}</td><td>${p.name}${p.id % 1 ? '<span class="float-end">*</span>' : ''}</td></tr>`);
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
        if (region == -1) {
            // use region of base form for event/discord pokemon
            region = _obtainablePokemonListMap[parseInt(p.id)].region;
        }

        if ((hideAlternateForms && p.id % 1) || (!showAllRegions && region > saveData.player.highestRegion)) {
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
        cells[6].dataset.sortVal = shinyHatched[p.id] || 0;

        const ev = Math.floor((party[p.id]?.['9'] || 0) / 1000 / evModifier);
        const evBonus = (ev < 50) ? (1 + 0.01 * ev) : (Math.pow(ev, Math.log(1.5) / Math.log(50)));

        cells[6].innerText = ev.toLocaleString();
        cells[6].dataset.sortVal = ev;
        cells[7].innerText = `x${evBonus.toLocaleString()}`;
        cells[7].dataset.sortVal = evBonus;

        const isCaptured = party[p.id] != undefined;
        const isCapturedShiny = isCaptured ? party[p.id]['5'] || false : false;

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

        cells[1].querySelector('.icon-container').innerHTML = icons.length ? icons.join('&nbsp;') : '';
    });
}

function loadDungeonClears(saveData) {
    const showAllRegions = document.getElementById('showAllRegionsCheck').checked;
    const dungeonsCleared = saveData.save.statistics.dungeonsCleared;
    //const clearsMap = _dungeonList.flat().reduce((map, d, i) => (map[d] = dungeonsCleared[i] || 0, map), []);

    for (let i = 0; i < dungeonsCleared.length; i++) {
        const cell = document.querySelector(`.dungeon-clears-row td[data-dungeon-id="${i}"]`);
        if (cell) {
            cell.innerText = dungeonsCleared[i];
        }
    }

    document.querySelectorAll('#dungeonClearsContainer table').forEach(t => {
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
    document.getElementById('pokemonStatsTable').querySelectorAll('tbody tr:not(.search-ignore)').forEach(r => {
        if (val.length == 0) {
            r.classList.remove('d-none');
            return;
        }

        const cells = r.querySelectorAll('td');
        if (cells[0].innerText.trim().includes(val) || cells[1].innerText.trim().toLowerCase().includes(val)) {
            r.classList.remove('d-none');
        }
        else {
            r.classList.add('d-none');
        }
    });
});

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