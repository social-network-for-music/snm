export default interface PlaylistPreview {
    _id: string;
    owner: {
        _id: string;
        
        username: string;
    };
    title: string;
    tags: string[];
    public: boolean;
    totalTracks: number;
    totalFollowers: number;
}