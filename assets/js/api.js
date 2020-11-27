import {
  allMatchesSaved, deleteMatch, matchSaved, saveForLater,
} from './db';

const baseUrl = 'https://api.football-data.org/v2/';
const bodyContent = document.querySelector('#body-content');

export const detailTeam = (id) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}teams/${id}`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': '592ed0f6ad314c55bc19568abf73c685',
    },
  }).then((response) => response.json())
    .then((jsonData) => resolve(jsonData))
    .catch((err) => reject(err));
});

const loading = () => {
  bodyContent.innerHTML = `
<div class="loading-container">
    <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-red-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
  </div>
    `;
};
const liverpoolHome = (liverpool) => {
  bodyContent.innerHTML = `
      <div class="wrap">
        <div class="header-home">
            <img src="${liverpool.crestUrl}" class="logo-image" alt="${liverpool.shortName}">
            <h1 class="text-darken-2 red-text">${liverpool.name.toUpperCase()}</h1>
        </div>
    </div>
    <div class="card">
        <div class="card-content red darken-2 white-text center-align">
            <div class="content">
                <h4>Active Competitions</h4>
                ${liverpool.activeCompetitions.map((d) => `
            <ul>
                <li>${d.name}</li>
            </ul>
            `).join('')
}
            </div>

        </div>
    </div>
      `;
};
export const getLiverpool = async () => {
  loading();

  const cacheApi = await caches.match(`${baseUrl}teams/64`);

  if (cacheApi) {
    const data = await cacheApi.json();
    liverpoolHome(await data);
  } else {
    const liverpool = await detailTeam(64);
    liverpoolHome(liverpool);
  }
};
const viewAllMatch = (allMatches) => {
  bodyContent.innerHTML = `
     <div class="wrap">
        <div class="header-home">
            <h1 class="red-text text-darken-2">Matches</h1>
            <p class="black-text">Jumlah Match:<span class="text-darken-2 red-text">${allMatches.count}</span></p>
        </div>
    </div>
    <div class="row">
${allMatches.matches.map((matche) => `
            <a href="./#matche?id=${matche.id}" id="link">
        <div class="col s12 m7 l6 card z-depth-0">
                <div class="card-stacked">
                    <div class="card-content black-text">
                        <div class="teams">
                            <div class="team">
                                <p>${matche.score.winner === 'AWAY_TEAM' ? `<span class="green-text">${matche.awayTeam.name}</span>` : matche.awayTeam.name}</p>
                                <P>${matche.score.fullTime.awayTeam === null ? '_' : matche.score.fullTime.awayTeam}</P>
                            </div>
                            <div class="team">
                                <p>${matche.score.winner === 'HOME_TEAM' ? `<span class="green-text">${matche.homeTeam.name}</span>` : matche.homeTeam.name}</p>
                                <P>${matche.score.fullTime.homeTeam === null ? '_' : matche.score.fullTime.homeTeam}</P>
                            </div>
                        </div>
                        <div class="schedule">
                            <p>${new Date(Date.parse(matche.utcDate)).toLocaleString('id-ID', {
    year: '2-digit', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  })}</p>
                            <p class="status">${matche.status}</p>
                        </div>
                    </div>
                </div>
        </div>
            </a>
    `).splice(' ').join('')
}
    </div>
      `;
};

export const getAllMAtches = new Promise((resolve, reject) => {
  fetch(`${baseUrl}teams/64/matches`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': '592ed0f6ad314c55bc19568abf73c685',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => reject(error));
});

export const getMatches = async () => {
  loading();
  const cacheAllMatch = await caches.match(`${baseUrl}teams/64/matches`);
  if (cacheAllMatch) {
    const data = await cacheAllMatch.json();
    viewAllMatch(data);
    return new Promise((resolve, reject) => {
      if (bodyContent.innerHTML !== '') {
        resolve(true);
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(false);
      }
    });
  }
  const allMatches = await getAllMAtches;
  viewAllMatch(allMatches);
  return new Promise((resolve, reject) => {
    if (bodyContent.innerHTML !== '') {
      resolve(true);
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(false);
    }
  });
};

const viewMatchId = async (data, saved) => {
  const awayTeamData = await detailTeam(data.match.awayTeam.id);
  const homeTeamData = await detailTeam(data.match.homeTeam.id);
  bodyContent.innerHTML = `
      <div class="card">
            <div class="row">
                <div class="col l3 s3">
                    <p class="blue-text text-darken-2">${data.match.competition.name}</p>
                </div>
                <div class="col l3 s3 offset-s6 offset-l6 right-align">
                    <p class="status size-normal">${data.match.status}</p>
                </div>
            </div>
            <div class="row">
                <div class="col m4 s4 center-align">
                    <img class="logo-team" src="${awayTeamData.crestUrl}" alt="${awayTeamData.shortName}">
                    <p class="black-text">${data.match.awayTeam.name}</p>
                </div>
                <div class="col m4 s4 center-align match-result">
                ${data.match.status === 'FINISHED'
    ? `
                    <div class="score">
                        <p>${data.match.score.fullTime.awayTeam}</p>
                        <p>-</p>
                        <p>${data.match.score.fullTime.homeTeam}</p>
                    </div>
                `
    : '<p class="black-text">vs</p>'
}
                </div>
                <div class="col m4 s4 center-align">
                    <img class="logo-team" src="${homeTeamData.crestUrl}" alt="${homeTeamData.shortName}">
                    <p class="black-text">${data.match.homeTeam.name}</p>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col l6">
                    <p class="black-text">Stadion:<span class="blue-text text-darken-2">${data.match.venue}</span></p>
                </div>
            </div>
      </div>
      <div class="fixed-action-btn">
         <a class="btn-floating btn-large red" id="save">
           <i class="large material-icons">${saved === 0 ? 'save' : 'delete'}</i>
         </a>
       </div>
      `;

  const btnSave = document.getElementById('save');
  btnSave.onclick = () => {
    if (saved === 0) {
      saveForLater(data);
    } else {
      // eslint-disable-next-line no-unused-expressions
      deleteMatch(data.match.id);
    }
  };
};
export const getMatcheId = async (id) => {
  loading();
  const cacheMatchId = await caches.match(`${baseUrl}matches/${id}`);
  if (cacheMatchId) {
    const data = await cacheMatchId.json();
    await viewMatchId(data, 0);
  } else {
    await fetch(`${baseUrl}matches/${id}`, {
      method: 'GET',
      headers: {
        'X-Auth-Token': '592ed0f6ad314c55bc19568abf73c685',
      },
    }).then((response) => response.json())
      .then((data) => {
        viewMatchId(data, 0);
      });
  }
};

export const getSavedMatches = async () => {
  const data = await allMatchesSaved();

  bodyContent.innerHTML = `
     <div class="wrap">
        <div class="header-home">
            <h1 class="red-text text-darken-2">Matches Saved</h1>
            <p class="black-text">Jumlah Match:<span class="text-darken-2 red-text">${data.length}</span></p>
        </div>
    </div>
    <div class="row">
${data.map((matche) => `
            <a href="./#saved?id=${matche.data.match.id}" id="savedLink">
        <div class="col s12 m7 l6 card z-depth-0">
                <div class="card-stacked">
                    <div class="card-content black-text">
                        <div class="teams">
                            <div class="team">
                                <p>${matche.data.match.score.winner === 'AWAY_TEAM' ? `<span class="green-text">${matche.data.match.awayTeam.name}</span>` : matche.data.match.awayTeam.name}</p>
                                <P>${matche.data.match.score.fullTime.awayTeam === null ? '_' : matche.data.match.score.fullTime.awayTeam}</P>
                            </div>
                            <div class="team">
                                <p>${matche.data.match.score.winner === 'HOME_TEAM' ? `<span class="green-text">${matche.data.match.homeTeam.name}</span>` : matche.data.match.homeTeam.name}</p>
                                <P>${matche.data.match.score.fullTime.homeTeam === null ? '_' : matche.data.match.score.fullTime.homeTeam}</P>
                            </div>
                        </div>
                        <div class="schedule">
                            <p>${new Date(Date.parse(matche.data.match.utcDate)).toLocaleString('id-ID', {
    year: '2-digit', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  })}</p>
                            <p class="status">${matche.data.match.status}</p>
                        </div>
                    </div>
                </div>
        </div>
            </a>
    `).splice(' ').join('')
}
    </div>
      `;
};

export const getMatchSaved = async (id) => {
  loading();
  const data = await matchSaved(id);
  await viewMatchId(data.data, 1);
};
