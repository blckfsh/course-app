import Navigation from "../navigation";

export default function Layout(props) {
    return (
        <div>
            <Navigation name={props.name} onSignOutHandler={props.onSignOutHandler} role={props.role} id={props.id} />      
        </div>
    )
}