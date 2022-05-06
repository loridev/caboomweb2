import ButtonSocialMedia from "../../UI/Button/ButtonSocialMedia";

function FollowUs(props) {
    return(
        <section className={props.className}>
            <h2>FOLLOW US</h2>
            <div>
                <ButtonSocialMedia name="instagram" href="https://www.instagram.com/carloselbombas/" />
                <ButtonSocialMedia name="twitter" href="https://twitter.com/caboomgame" />
            </div>
        </section>
    );
}

export default FollowUs;