import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
  onSubscribeButton: () => void;
}

export default function SubscribeButton({
  priceId,
  onSubscribeButton,
}: SubscribeButtonProps) {
  return (
    <button
      onClick={() => onSubscribeButton()}
      className={styles.subscribeButton}
      type="button"
    >
      Subscribe now
    </button>
  );
}
