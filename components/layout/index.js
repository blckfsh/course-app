import Navigation from "../navigation";
import Dashboard from "../dashboard";

export default function Layout(props) {
    return(
        <div>
            <Navigation />
            <Dashboard name={props.name} />
        </div>
    )
}