import { useState } from 'react';
import { Loader2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

import Input from '../../../../../components/ui/Input';
import Button from '../../../../../components/ui/Button';
import ComboBox, {
    type OptionType,
} from '../../../../../components/ui/ComboBox';
import { JobseekerService } from '../../../../../services/jobseekerService';
import type { JobSeekerProfile } from '../../../../../types/jobseeker';

const socialNetworks: OptionType[] = [
    {
        label: 'LinkedIn',
        icon: <FaLinkedin className='text-primary-600' />,
        value: 'linkedln',
    },
    {
        label: 'Facebook',
        icon: <FaFacebook className='text-blue-600' />,
        value: 'facebook',
    },
    {
        label: 'Twitter',
        icon: <FaTwitter className='text-sky-500' />,
        value: 'twitter',
    },
];

interface SocialLinkItem {
    id: string;
    network: OptionType;
    url: string;
}

interface SocialLinksTabProps {
    profile: JobSeekerProfile;
    onUpdated: () => Promise<void>;
}

export default function SocialLinksTab({
    profile,
    onUpdated,
}: SocialLinksTabProps) {
    const [links, setLinks] = useState<SocialLinkItem[]>(() => {
        const initial: SocialLinkItem[] = [];
        if (profile.facebookUrl)
            initial.push({
                id: 'fb',
                network: socialNetworks[1],
                url: profile.facebookUrl,
            });
        if (profile.twitterUrl)
            initial.push({
                id: 'tw',
                network: socialNetworks[2],
                url: profile.twitterUrl,
            });
        if (profile.linkedlnUrl)
            initial.push({
                id: 'li',
                network: socialNetworks[0],
                url: profile.linkedlnUrl,
            });
        return initial.length > 0
            ? initial
            : [
                  {
                      id: Date.now().toString(),
                      network: socialNetworks[0],
                      url: '',
                  },
              ];
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleAddLink = () => {
        if (links.length >= 3) return;
        const usedValues = links.map((l) => l.network.value);
        const nextNetwork =
            socialNetworks.find((n) => !usedValues.includes(n.value)) ||
            socialNetworks[0];
        setLinks([
            ...links,
            { id: Date.now().toString(), network: nextNetwork, url: '' },
        ]);
    };

    const handleRemoveLink = (id: string) => {
        if (links.length > 1) setLinks(links.filter((l) => l.id !== id));
    };

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('facebookUrl', '');
        formData.append('twitterUrl', '');
        formData.append('linkedlnUrl', '');

        links.forEach((link) => {
            if (link.url.trim()) {
                formData.set(`${link.network.value}Url`, link.url.trim());
            }
        });

        try {
            setIsLoading(true);
            await JobseekerService.updateProfile(formData);
            await onUpdated();
            toast.success('Social links updated successfully!');
        } catch (error) {
            toast.error((error as Error).message || 'Failed to update.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSave}
            className='w-full animate-in fade-in duration-500 space-y-6'
        >
            <div className='flex flex-col gap-4'>
                {links.map((link) => (
                    <div key={link.id} className='flex items-center gap-3'>
                        <div className='w-1/3 min-w-[150px]'>
                            <ComboBox
                                options={socialNetworks}
                                value={link.network}
                                onChange={(opt) =>
                                    setLinks(
                                        links.map((l) =>
                                            l.id === link.id
                                                ? { ...l, network: opt }
                                                : l
                                        )
                                    )
                                }
                            />
                        </div>
                        <div className='flex-1'>
                            <Input
                                value={link.url}
                                placeholder='https://...'
                                onChange={(e) =>
                                    setLinks(
                                        links.map((l) =>
                                            l.id === link.id
                                                ? { ...l, url: e.target.value }
                                                : l
                                        )
                                    )
                                }
                            />
                        </div>
                        <button
                            type='button'
                            onClick={() => handleRemoveLink(link.id)}
                            disabled={links.length === 1}
                            className='p-3 rounded-full border border-gray-100 hover:bg-red-50 hover:text-danger-500 disabled:opacity-30'
                        >
                            <X size={18} />
                        </button>
                    </div>
                ))}
            </div>

            {links.length < 3 && (
                <button
                    type='button'
                    onClick={handleAddLink}
                    className='flex items-center gap-2 text-sm font-bold text-primary-500 hover:text-primary-600'
                >
                    <Plus size={18} /> Add Social Link
                </button>
            )}

            <div className='pt-4'>
                <Button
                    variant='primary'
                    type='submit'
                    className='px-10 h-[50px]'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className='animate-spin' size={20} />
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </div>
        </form>
    );
}
