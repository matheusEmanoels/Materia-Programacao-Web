interface IButtonWithProgress{
    className?: string;
    disable: boolean;
    text: string;
    pendingApiCall: boolean;
    onClick: () => void;
}

export function ButtonWithProgress({className, disable, text, pendingApiCall, onClick}: IButtonWithProgress){
    return(
        <button className={className || "w-100 btn btn-lg btn-primary mb-3"} onClick={onClick} disabled={disable}>
            {pendingApiCall &&(
                <div className="spinner-border text-light-spinner spinner-border-sm nr-sm-1" role="status">
                    <span className="visually-hidden">Aguarde...</span>
                </div>
            )}{" "}
            &nbsp; {text}
        </button>
    );
}