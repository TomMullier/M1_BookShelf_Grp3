import React, { FC, ReactElement } from 'react';
import styles from './modal.module.css';

// Define the props for the modal
type ModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onclose: () => void;
  onSubmit?: () => void;
  title?: ReactElement | string;
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
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          x
        </button>
        {title ? <div className={styles.headerTitle}>{title}</div> : undefined}
      </div>
      <hr className={styles.divider} />
      <div className={styles.modalBody}>{children}</div>
      <hr className={styles.divider} />
      <div className={styles.modalFooter}>
        {onSubmit ? (
          <button type="button" className="primary" onClick={onSubmit}>
            Submit
          </button>
        ) : undefined}
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
