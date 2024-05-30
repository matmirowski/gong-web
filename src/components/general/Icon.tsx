import React from 'react';

type IconProps = {
    name: string;
    className?: string;
    size?: number;
    withBorder?: boolean;
    onClick?: () => void;
};

const Icon: React.FC<IconProps> = ({ name, className, size = 24, withBorder = false, onClick }) => {
    const [src, setSrc] = React.useState<string>();

    React.useEffect(() => {
        import(`../../resources/${name}.png`)
            .then(module => setSrc(module.default))
            .catch(error => console.error(`Failed to load image ${name}:`, error));
    }, [name]);

    if (!src) {
        return <div>Loading...</div>;
    }

    const borderStyle = withBorder ? {
        border: '5px solid #163172',
        borderRadius: '10%',
        padding: '5px',
        backgroundColor: 'white'
    } : {};

    return (
        <img
            src={src}
            alt={name}
            className={className}
            style={{ width: size, height: size, ...borderStyle }}
            onClick={onClick}
        />
    );
};

export default Icon;
