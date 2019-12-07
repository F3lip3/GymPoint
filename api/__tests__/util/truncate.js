import database from '../../src/database';

export default function truncate() {
  return Promise.all(
    Object.keys(database.connection.models).map(key => {
      console.log(key);
      if (key === 'User') return null;
      return database.connection.models[key].destroy({
        truncate: true,
        force: true
      });
    })
  );
}
