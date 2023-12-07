import { icons } from 'lucide-react';

export const DynamicIcon = ({ name }:{name: keyof typeof icons}) => {
    const LucidIcon = icons[name]
    return <LucidIcon />
}