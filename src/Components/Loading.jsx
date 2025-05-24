import { ProgressSpinner } from 'primereact/progressspinner';
import '../styles/styles.css';

const Loading = () => {
    return (
        <div className="loading-container" style={{textAlign: 'center', marginTop: '2rem'}}>
            <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="4" fill="#1a1a2e" animationDuration=".10s" />
            <p className="loading-text" style={{color: '#7a47ff', marginTop: '1rem', fontWeight: '600', fontSize: '1.2rem'}}>
                Cargando productos...
            </p>
        </div>
    );
};

export default Loading;