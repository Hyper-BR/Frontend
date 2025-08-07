import { Modal } from '@/components/commons/Modal';
import { Droppable } from '@/components/commons/Droppable/Droppable';
import { Button } from '@/components/commons/Button/Button';
import TrackForm from '@/components/ui/Forms/TrackForm';
import TrackList from '../../Lists/TrackList';
import { Accordion } from '@/components/commons/Accordion';
import { useUploadRelease } from './useUploadRelease';
import styles from './UploadReleaseModal.module.scss';
import Select from '@/components/commons/Select/Select';

const UploadReleaseModal = () => {
  const {
    loading,
    uploadStarted,
    releaseType,
    activePanel,
    setActivePanel,
    selectedTrackIndex,
    setSelectedTrackIndex,
    artistSearch,
    setArtistSearch,
    collaboratorOptions,
    form,
    setForm,
    handleUploadTracks,
    handleUploadCover,
    handleSubmit,
    resetAndClose,
  } = useUploadRelease();

  return (
    <form onSubmit={handleSubmit}>
      <Modal.Root modal="upload" size="xl" onClose={resetAndClose}>
        <Modal.Header title={releaseType === 'SINGLE' ? 'Upload de Faixa' : 'Upload de EP / Álbum'} />

        <Modal.Content>
          {!uploadStarted && (
            <div className={styles.initialDrop}>
              <Droppable
                label="Arraste ou clique para enviar suas faixas"
                onDrop={handleUploadTracks}
                shape="rectangle"
                size="xl"
                accept="audio/*"
                multiple
              />
            </div>
          )}

          {uploadStarted && (
            <div className={styles.columns}>
              <div className={styles.cover}>
                <Droppable
                  label="Upload da capa"
                  onDrop={handleUploadCover}
                  shape="square"
                  size="xl"
                  accept="image/*"
                  file={form.cover}
                />

                {releaseType != 'SINGLE' && (
                  <div className={styles.releaseTypeSelect}>
                    <Select
                      value={
                        form.type
                          ? {
                              value: form.type,
                              label: form.type === 'EP' ? 'EP' : 'Álbum',
                            }
                          : null
                      }
                      onChange={(option) => {
                        if (option) {
                          setForm((prev) => ({ ...prev, type: option.value }));
                        }
                      }}
                      options={[
                        { value: 'EP', label: 'EP' },
                        { value: 'ALBUM', label: 'Álbum' },
                      ]}
                      placeholder="Selecione o tipo de release"
                    />
                  </div>
                )}
              </div>

              <div className={styles.form}>
                <TrackForm
                  track={form.tracks[selectedTrackIndex]}
                  onChange={(field, value) =>
                    setForm((prev) => {
                      const updated = [...prev.tracks];
                      updated[selectedTrackIndex] = {
                        ...updated[selectedTrackIndex],
                        [field]: value,
                      };
                      return { ...prev, tracks: updated };
                    })
                  }
                  matchedArtists={artistSearch.matched}
                  collaboratorOptions={collaboratorOptions}
                  onArtistSelect={(selected) =>
                    setForm((prev) => {
                      const updated = [...prev.tracks];
                      updated[selectedTrackIndex].artists = selected;
                      return { ...prev, tracks: updated };
                    })
                  }
                  searchArtistName={artistSearch.name}
                  onSearchInput={(name) => setArtistSearch((prev) => ({ ...prev, name }))}
                />
              </div>

              <div className={styles.accordion}>
                <Accordion.Root>
                  <Accordion.Item
                    id="tracks"
                    activeId={activePanel}
                    setActiveId={() => setActivePanel('tracks')}
                    title="Faixas"
                  >
                    <TrackList
                      tracks={form.tracks}
                      activeIndex={selectedTrackIndex}
                      onSelect={(i) => setSelectedTrackIndex(i)}
                    />
                  </Accordion.Item>

                  <Accordion.Item
                    id="configs"
                    activeId={activePanel}
                    setActiveId={() => setActivePanel('configs')}
                    title="Configurações Avançadas"
                  >
                    <div className={styles.configs}>
                      <label>Descrição</label>
                    </div>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
            </div>
          )}
        </Modal.Content>

        {uploadStarted && (
          <Modal.Footer
            cancelButton={
              <Button variant="ghost" onClick={resetAndClose}>
                Cancelar
              </Button>
            }
            submitButton={
              <Button type="submit" loading={loading}>
                Upload
              </Button>
            }
          />
        )}
      </Modal.Root>
    </form>
  );
};

export default UploadReleaseModal;
