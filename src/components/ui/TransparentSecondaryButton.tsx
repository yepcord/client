import BaseButton, {BaseButtonProps} from "./BaseButton";

export default function TransparentSecondaryButton(props: BaseButtonProps) {
    return <BaseButton {...props} primaryClass="btn-secondary-transparent"/>;
}