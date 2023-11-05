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
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
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
      </div>
    </div>
  );
};

export default Modal;
