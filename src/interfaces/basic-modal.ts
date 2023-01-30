export interface BasicModal {
  handlePrimaryButton: () => void;
  handleSecondaryButton: () => void;
  title: string;
  description: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  isOpen: boolean;
}
