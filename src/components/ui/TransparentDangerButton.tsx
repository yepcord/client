import BaseButton, {BaseButtonProps} from "./BaseButton";

export default function TransparentDangerButton(props: BaseButtonProps) {
    return <BaseButton {...props} primaryClass="btn-transparent btn-danger-transparent"/>;
}