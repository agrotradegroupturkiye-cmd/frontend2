type Props = { title?: string; children?: React.ReactNode };
export default function Component(props: Props) { return <div>{props.title || "Компонент"}{props.children}</div>; }
