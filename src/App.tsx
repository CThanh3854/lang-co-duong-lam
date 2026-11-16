import {useEffect, useState} from 'react';
import {ArchiveCatalogSection} from './components/ArchiveCatalogSection';
import {ArtifactModal} from './components/ArtifactModal';
import {ChronologySection} from './components/ChronologySection';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {HeritageMapSection} from './components/HeritageMapSection';
import {HeroExhibition} from './components/HeroExhibition';
import {NotebookDrawer} from './components/NotebookDrawer';
import {VirtualGalleryRoom} from './components/VirtualGalleryRoom';
import {type MuseumArtifact} from './data/duongLamArchive';

const SAVED_STORAGE_KEY = 'duonglam_saved_artifacts_v1';
const NOTES_STORAGE_KEY = 'duonglam_artifact_notes_v1';

export default function App() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(SAVED_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : ['cong-mong-phu', 'dinh-mong-phu'];
    } catch {
      return ['cong-mong-phu', 'dinh-mong-phu'];
    }
  });

  const [notesById, setNotesById] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem(NOTES_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });

  const [inspectedArtifact, setInspectedArtifact] = useState<MuseumArtifact | null>(null);
  const [notebookOpen, setNotebookOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notesById));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [notesById]);

  function handleToggleSave(id: string) {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  function handleUpdateNote(id: string, note: string) {
    setNotesById((prev) => ({...prev, [id]: note}));
  }

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917]">
      <Header
        savedCount={savedIds.length}
        onOpenNotebook={() => setNotebookOpen(true)}
      />

      <main>
        <HeroExhibition
          onEnterExhibition={() => scrollToSection('phong-trung-bay')}
          onExploreMap={() => scrollToSection('ban-do-di-san')}
        />

        <VirtualGalleryRoom
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onInspectArtifact={setInspectedArtifact}
        />

        <HeritageMapSection onInspectArtifact={setInspectedArtifact} />

        <ChronologySection onInspectArtifact={setInspectedArtifact} />

        <ArchiveCatalogSection
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onInspectArtifact={setInspectedArtifact}
        />
      </main>

      <Footer />

      <ArtifactModal
        artifact={inspectedArtifact}
        isSaved={inspectedArtifact ? savedIds.includes(inspectedArtifact.id) : false}
        onClose={() => setInspectedArtifact(null)}
        onToggleSave={handleToggleSave}
      />

      <NotebookDrawer
        open={notebookOpen}
        savedIds={savedIds}
        notesById={notesById}
        onClose={() => setNotebookOpen(false)}
        onRemove={handleToggleSave}
        onUpdateNote={handleUpdateNote}
        onInspectArtifact={setInspectedArtifact}
      />
    </div>
  );
}
