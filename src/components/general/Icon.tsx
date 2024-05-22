import React from 'react';

type IconProps = {
    name: string;
    className?: string;
    size?: number;
    withBorder?: boolean;
};

const Icon: React.FC<IconProps> = ({ name, className, size = 24, withBorder = false }) => {
    const [src, setSrc] = React.useState<string>();

    React.useEffect(() => {
        import(`../../resources/${name}.png`)
            .then(module => setSrc(module.default))
            .catch(error => console.error(`Failed to load image ${name}:`, error));
    }, [name]);

    if (!src) {
        return <div>Loading...</div>;
    }

    // Apply border style if withBorder is true
    const borderStyle = withBorder ? {
        border: '5px solid #163172', // Adjust the border width and color directly using the hex value
        borderRadius: '10%', // Adjust the border radius to make it rounded
        padding: '5px', // Add padding to create space between the image and border
        backgroundColor: 'white' // Add background color if needed
    } : {};

    return (
        <img
            src={src}
            alt={name}
            className={className}
            style={{ width: size, height: size, ...borderStyle }} // Merge styles
        />
    );
};

export default Icon;
