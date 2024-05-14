import React from 'react';

type IconProps = {
    name: string;
    className?: string;
    size?: number;
};

const Icon: React.FC<IconProps> = ({ name, className, size = 24 }) => {
    const [src, setSrc] = React.useState<string>();

    React.useEffect(() => {
        import(`../../resources/${name}.png`)
            .then(module => setSrc(module.default))
            .catch(error => console.error(`Failed to load image ${name}:`, error));
    }, [name]);

    if (!src) {
        return <div>Loading...</div>;
    }

    return (
        <img src={src} alt={name} className={className} style={{ width: size, height: size }} />
    );
};

export default Icon;
