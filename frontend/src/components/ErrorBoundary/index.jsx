import { useSelector } from "react-redux";
import { selectPageLocation } from "../../features/page/pageSlice";

const ErrorBoundary = () => {
    const page = useSelector(selectPageLocation);

    return <div>ErrorBoundary</div>;
};

export default ErrorBoundary;
