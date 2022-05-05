import ButtonSocialMedia from "../../UI/Button/ButtonSocialMedia";

function FollowUs(props) {
    return(
        <section className={props.className}>
            <h2>FOLLOW US</h2>
            <div>
                <ButtonSocialMedia name="instagram" />
                <ButtonSocialMedia name="twitter" />
            </div>
        </section>
    );
}

export default FollowUs;