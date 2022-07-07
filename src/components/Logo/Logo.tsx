import './logo.css';

interface Props {
    size: "Large" | "Small";
}

export default function Logo({size}: Props) {
    const logoStyle = {
        logoMain: size === "Large" ? 'logoMainLg' : 'logoMainSm',
        cardLeft: size === "Large" ? 'leftCardLg' : 'leftCardSm',
        cardRight: size === "Large" ? 'rightCardLg' : 'rightCardSm',
    }

    return (
        <div className={logoStyle.logoMain}>
            <div className={logoStyle.cardRight}>
                { size === "Large" ? 
                    <>Note</> :
                    <>&#9834;</>
                }
            </div>
            <div className={logoStyle.cardLeft}>
                { size === "Large" ? 
                    <>Notes</> :
                    <>N</>
                }
            </div>
        </div>
    );
}