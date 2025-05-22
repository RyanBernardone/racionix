import styles from './RoundImg.module.css';

function RoundImg({src, alt, width}){
    return(
        <img
            className={`${styles.rounded_image} ${styles[width]}`}
            src={src}
            alt={alt}
        />
    )
}

export default RoundImg