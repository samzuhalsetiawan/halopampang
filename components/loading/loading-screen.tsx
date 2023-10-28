import LoadingBox from "./LoadingBox";

export default function LoadingScreen() {
    return (
        <div className="h-screen w-screen overflow-hidden flex justify-center items-center">
            <LoadingBox />
        </div>
    )
}