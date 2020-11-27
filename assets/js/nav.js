import {
  getLiverpool, getMatches, getMatcheId, getSavedMatches, getMatchSaved,
} from './api';

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelectorAll('.topnav,.sidenav');
  const sideNav = document.querySelector('.sidenav');
  const links = document.querySelectorAll('.topnav li a');
  const bodyContent = document.querySelector('#body-content');

  // eslint-disable-next-line no-undef
  M.Sidenav.init(sideNav);

  const contentPage = async (page) => {
    if (page === 'home') {
      await getLiverpool();
    } else if (page === 'matches') {
      await getMatches();
      const matches = await getMatches();
      if (matches !== undefined) {
        const link = document.querySelectorAll('#link');
        link.forEach((elem) => {
          elem.addEventListener('click', () => {
            const id = elem.getAttribute('href').substr(13);
            getMatcheId(id);
          });
        });
      }
    } else if (page.search('matche?id') && page.length > 15) {
      await getMatcheId(page.substr(10));
    } else if (page === 'saved') {
      await getSavedMatches();
      const link = document.querySelectorAll('#savedLink');
      link.forEach((elem) => {
        elem.addEventListener('click', () => {
          const id = elem.getAttribute('href').substr(12);
          getMatchSaved(id);
        });
      });
    } else {
      bodyContent.innerHTML = '<p>Page Not Found</p>';
    }
  };

  nav.forEach((elem) => {
    elem.addEventListener('click', async (event) => {
      // eslint-disable-next-line no-undef
      M.Sidenav.getInstance(sideNav).close();
      const page = event.target.getAttribute('href').substr(1);
      await contentPage(page);
    });
  });

  links.forEach((link) => {
    let curentPage = window.location.hash.substr(1);
    const navList = link.getAttribute('href').substr(1);
    if (curentPage === '') {
      curentPage = 'home';
    } else if (curentPage === navList) {
      curentPage = navList;
    }
    contentPage(curentPage);
  });
});
