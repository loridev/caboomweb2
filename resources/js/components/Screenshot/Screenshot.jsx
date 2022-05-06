import Image from "../../UI/Image/Image";
import ImageContainer from "../../UI/Image/ImageContainer";
import clases from "./styles/Screenshot.module.css";

function Screenshot(props) {
    return(
        <section className={props.className}>
            <ImageContainer>
                <Image src="/images/Screenshot_1.png" name="World 2" className={clases.img} />
                <Image src="/images/Screenshot_2.png" name="World 1" className={clases.img} />
            </ImageContainer>

            <ImageContainer>
                <Image src="/images/Screenshot_3.png" name="World 3" className={clases.img} />
                <Image src="/images/Screenshot_4.png" name="Multiplayer" className={clases.img} />
            </ImageContainer>
        </section>
    );
}

export default Screenshot;