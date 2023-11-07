import React, { FC, ReactElement } from 'react';
import styles from './modal.module.css';

// Define the props for the modal
type ModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  title: ReactElement | string;
  children: ReactElement;
};

const simulateKeyPress = (touch: string): void => {
  const event = new KeyboardEvent('keydown', {
    key: touch,
  });
  document.dispatchEvent(event);
};

const closeBackground = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
): void => {
  if (e.target === e.currentTarget) {
    const backgroundModal = document.getElementById('backgroundModal');
    if (backgroundModal) {
      simulateKeyPress('Escape');
    }
  }
};

const Modal: FC<ModalProps> = ({
  isOpen,
  children,
  title,
  onSubmit,
  onCancel,
}) => {
  if (!isOpen) {
    return null; // Render nothing if the modal is closed
  }
  return (
    <div
      id="backgroundModal"
      className={styles.modalOverlay}
      onClick={closeBackground}
    >
      <span className={styles.modal} role="dialog">
        <div className={styles.modalHeader}>
          <button
            type="button"
            className={styles.cancelButtonCross}
            onClick={onCancel}
          >
            x
          </button>
          {title ? (
            <div className={styles.headerTitle}>{title}</div>
          ) : undefined}
        </div>
        <div className={styles.divider} />
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.divider} />
        <div className={styles.modalFooter}>
          {onSubmit ? (
            <button
              type="submit"
              className={styles.submitButton}
              onClick={onSubmit}
            >
              Submit
            </button>
          ) : undefined}
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </span>
    </div>
  );
};

export default Modal;
