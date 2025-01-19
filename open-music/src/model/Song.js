const SongSimple = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
});
const Song = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId
});

module.exports = SongSimple;