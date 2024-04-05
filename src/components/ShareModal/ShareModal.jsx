import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import PostShare from "../postShare/PostShare";

function ShareModal({ modalOpened, setModalOpened }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="55%"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}
        <PostShare/>
      </Modal>
    </>
  );
}

export default ShareModal;
