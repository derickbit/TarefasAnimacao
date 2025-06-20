import styles from "./Sobre.module.css";

const Sobre = () => {
  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: 0 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 32px 1fr",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 24px 32px 24px",
          alignItems: "stretch",
          gap: 0,
        }}
      >
        {/* Coluna Esquerda */}
        <div
          style={{
            background: "#fff",
            borderRadius: "1.2rem",
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "2rem",
              color: "#222",
              lineHeight: 1.1,
            }}
          >
            Nossa História
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              color: "#444",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
            }}
          >
            Há 18 anos, um sonho nasceu e começou a se materializar na mente e
            no incansável esforço dos Irmãos Casagrande. Uma jornada que se
            desdobrou nas salas de aula que pisaram e nas instituições que
            lideraram, um compromisso apaixonado para promover o desenvolvimento
            contínuo e incessante de educadores e instituições de ensino, tanto
            públicas, quanto privadas. Entenda a trajetória dessa instituição
            que se transformou em referência na formação continuada de
            educadores.
          </p>
          <a
            href="#tutorial"
            style={{
              display: "inline-block",
              background: "#222",
              color: "#fff",
              fontWeight: 600,
              padding: "0.9rem 2.2rem",
              borderRadius: "2rem",
              textDecoration: "none",
              fontSize: "1.1rem",
              marginTop: "1.5rem",
              transition: "background 0.2s",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
            }}
          >
            Veja o Tutorial do Jogo
          </a>
        </div>
        {/* Linha vertical central */}
        <div
          style={{
            width: 4,
            background: "#d1d5db",
            borderRadius: 2,
            margin: "24px 0",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          {/* Pontos da timeline */}
          <div
            style={{
              position: "absolute",
              top: "120px",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: 24,
              height: 24,
              borderRadius: "50%",
              border: "2px solid #888",
              background: "#fff",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "320px",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: 24,
              height: 24,
              borderRadius: "50%",
              border: "2px solid #888",
              background: "#fff",
            }}
          ></div>
        </div>
        {/* Coluna Direita: Timeline */}
        <div
          style={{
            background: "#fff",
            borderRadius: "1.2rem",
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
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
              A Semente da Mudança
            </h2>
            <p
              style={{
                color: "#444",
                fontSize: "1.08rem",
                lineHeight: 1.7,
              }}
            >
              Tudo começou em 2006, quando a semente do Instituto Casagrande foi
              plantada como a Alleanza Educacional. Nasceu em solo paranaense
              com um objetivo claro: promover a formação de gestores escolares e
              oferecer assessoria estratégica a instituições de ensino.
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
              Expandindo Horizontes
            </h2>
            <p
              style={{
                color: "#444",
                fontSize: "1.08rem",
                lineHeight: 1.7,
              }}
            >
              Em 2012, a Alleanza Educacional cresceu e se transformou em
              Alleanza Brasil. Com essa expansão, a organização ampliou seus
              horizontes e começou a dedicar-se não apenas à formação de
              gestores escolares, mas também à formação de professores,
              consolidando sua posição como um farol de educação em todo o país.
            </p>
          </div>
        </div>
      </div>
      {/* Tutorial do Jogo */}
      <div
        id="tutorial"
        style={{
          maxWidth: 900,
          margin: "48px auto 0 auto",
          background: "#fff",
          borderRadius: "1.2rem",
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
          padding: "2.5rem 2rem",
        }}
      >
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
        <ol
          style={{
            color: "#444",
            paddingLeft: "1.2rem",
            marginTop: "0.5rem",
          }}
        >
          <li
            style={{
              marginBottom: "0.4rem",
              fontSize: "1.05rem",
            }}
          >
            O objetivo do BlackJack é somar 21 pontos ou chegar o mais próximo
            possível sem ultrapassar esse valor.
          </li>
          <li
            style={{
              marginBottom: "0.4rem",
              fontSize: "1.05rem",
            }}
          >
            Cada jogador recebe duas cartas no início da rodada.
          </li>
          <li
            style={{
              marginBottom: "0.4rem",
              fontSize: "1.05rem",
            }}
          >
            Você pode pedir mais cartas ("Hit") ou parar ("Stand").
          </li>
          <li
            style={{
              marginBottom: "0.4rem",
              fontSize: "1.05rem",
            }}
          >
            Se a soma das suas cartas passar de 21, você perde ("Bust").
          </li>
          <li
            style={{
              marginBottom: "0.4rem",
              fontSize: "1.05rem",
            }}
          >
            O dealer (computador) joga após você, seguindo regras próprias.
          </li>
          <li
            style={{
              marginBottom: "0.4rem",
              fontSize: "1.05rem",
            }}
          >
            Ganha quem tiver a maior pontuação sem ultrapassar 21.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Sobre;
