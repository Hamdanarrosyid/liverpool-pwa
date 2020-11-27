const dbPromised = idb.open('liverpool', 1, (upgradeDb) => {
  const articlesObjectStore = upgradeDb.createObjectStore('matches', {
    keyPath: 'ID',
  });
  articlesObjectStore.createIndex('post_title', 'post_title', { unique: false });
});

// eslint-disable-next-line import/prefer-default-export
export const saveForLater = async (match) => {
  dbPromised
    .then((db) => {
      const tx = db.transaction('matches', 'readwrite');
      const store = tx.objectStore('matches');
      console.log(match.match);
      store.put({
        ID: match.match.id,
        data: match,
      });
      return tx.complete;
    })
    .then(() => {
      console.log('Artikel berhasil di simpan.');
    });
};

export const allMatchesSaved = () => new Promise((resolve, reject) => {
  dbPromised
    .then((db) => {
      const tx = db.transaction('matches', 'readonly');
      const store = tx.objectStore('matches');
      return store.getAll();
    })
    .then((matches) => {
      resolve(matches);
    });
});
export const matchSaved = (id) => new Promise((resolve, reject) => {
  dbPromised
    .then(async (db) => {
      const tx = await db.transaction('matches', 'readonly');
      const store = await tx.objectStore('matches');
      // eslint-disable-next-line radix
      const data = await store.get(parseInt(id));
      resolve(data);
    });
});

export const deleteMatch = (id) => {
  dbPromised.then((db) => {
    const tx = db.transaction('matches', 'readwrite');
    const store = tx.objectStore('matches');
    // eslint-disable-next-line radix
    store.delete((parseInt(id)));
    return tx.complete;
  }).then(() => {
    console.log('Item deleted');
  });
};
