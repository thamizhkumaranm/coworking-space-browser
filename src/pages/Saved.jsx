import { Link } from "react-router-dom";
import SpaceCard from "../components/SpaceCard";
import { spaces } from "../data/spaces";

function Saved({ savedIds, onToggleSaved }) {
  const savedSpaces = spaces.filter((space) => savedIds.includes(space.id));

  if (savedSpaces.length === 0) {
    return (
      <main>
        <h1>Saved spaces</h1>
        <p>You have not saved any coworking spaces yet.</p>
        <Link to="/">Browse spaces</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Saved spaces</h1>
      <p>{savedSpaces.length} saved spaces</p>

      <section className="spaces-grid" aria-label="Saved coworking spaces">
        {savedSpaces.map((space) => (
          <SpaceCard
            key={space.id}
            space={space}
            isSaved={true}
            onToggleSaved={onToggleSaved}
          />
        ))}
      </section>
    </main>
  );
}

export default Saved;
