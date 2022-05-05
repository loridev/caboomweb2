import Dev from "../DevInfo/Dev";
import DevInfo from "../DevInfo/DevInfo";

function AboutUs(props) {
    return(
        <section className={props.className}>
            <h2>ABOUT US</h2>
            <DevInfo>
                <Dev name="Pol Adrover" src="/images/avatarPol.png" age="20" description="I'm studying DAW in La Salle Gràcia. I live in Sant Sadurní d'Anoia. I enjoy playing hockey." />
                <Dev name="Alba Candelario" src="/images/avatarAlba.png" age="21" description="I'm studying DAW in La Salle Gràcia. I live in Vilassar de Mar. I enjoy travelling." />
                <Dev name="Marcos Hita" src="/images/avatarMarcosHita.png" age="19" description="I'm studying DAW in La Salle Gràcia. I live in Premià de Mar. I enjoy watching football." />
                <Dev name="Eric Lorite" src="/images/avatarEric.png" age="20" description="I'm studying DAW in La Salle Gràcia. I live in Martorell. I enjoy listening to music." />
            </DevInfo>
        </section>
    );
}

export default AboutUs;