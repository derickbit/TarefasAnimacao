import LinkButton from "../Layout/LinkButton";
import styles from "./Sobre.module.css";

const Sobre = () => {
  return (
    <div className={styles.sobreSectionBg}>
      <div className={styles.sobreSectionGrid}>
        {/* Coluna Esquerda */}
        <div className={styles.sobreSectionLeft}>
          <h1 className={styles.sobreSectionTitle}>Nossa História</h1>
          <p className={styles.sobreSectionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <LinkButton
            to="#tutorial"
            text="Veja o Tutorial do Jogo"
            className="mainButton"
          />
        </div>
        {/* Linha vertical central */}
        <div className={styles.sobreSectionDivider}></div>
        {/* Coluna Direita: Timeline */}
        <div className={styles.sobreSectionRight}>
          {/* 2006 */}
          <div style={{ marginBottom: 80 }}>
            <div
              style={{
                minWidth: 70,
                background: "#f5f5f5",
                color: "#222",
                fontWeight: 700,
                fontSize: "1.1rem",
                borderRadius: 999,
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
                padding: "0.7rem 1.5rem",
                textAlign: "center",
                marginBottom: 16,
                width: 90,
              }}
            >
              2006
            </div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#222",
                marginBottom: 8,
              }}
            >
              Origem do projeto
            </h2>
            <p
              style={{
                color: "#444",
                fontSize: "1.18rem",
                lineHeight: 1.7,
                maxWidth: "100%",
              }}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit
            </p>
          </div>
          {/* 2012 */}
          <div>
            <div
              style={{
                minWidth: 70,
                background: "#f5f5f5",
                color: "#222",
                fontWeight: 700,
                fontSize: "1.1rem",
                borderRadius: 999,
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
                padding: "0.7rem 1.5rem",
                textAlign: "center",
                marginBottom: 16,
                width: 90,
              }}
            >
              2012
            </div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#222",
                marginBottom: 8,
              }}
            >
              Futuro do projeto
            </h2>
            <p
              style={{
                color: "#444",
                fontSize: "1.18rem",
                lineHeight: 1.7,
                maxWidth: "100%",
              }}
            >
              ed quia non numquam eius modi tempora incidunt ut labore et dolore
              magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
              nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
              aliquid ex ea commodi consequatur? Quis autem vel eum iure
              reprehenderit qui in ea voluptate velit esse quam nihil molestiae
              consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
              pariatur?
            </p>
          </div>
        </div>
      </div>
      {/* Tutorial do Jogo */}
      <div className={styles.sobreTutorialBox} id="tutorial">
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#222",
            marginBottom: 16,
          }}
        >
          Como Jogar BlackJack
        </h2>
        <ol className={styles.sobreList}>
          <li>
            O objetivo do BlackJack é somar 21 pontos ou chegar o mais próximo
            possível sem ultrapassar esse valor.
          </li>
          <li>Cada jogador recebe duas cartas no início da rodada.</li>
          <li>
            Você pode pedir mais cartas (&quot;Hit&quot;) ou parar
            (&quot;Stand&quot;).
          </li>
          <li>
            Se a soma das suas cartas passar de 21, você perde
            (&quot;Bust&quot;).
          </li>
          <li>
            O dealer (computador) joga após você, seguindo regras próprias.
          </li>
          <li>Ganha quem tiver a maior pontuação sem ultrapassar 21.</li>
        </ol>
      </div>
    </div>
  );
};

export default Sobre;
