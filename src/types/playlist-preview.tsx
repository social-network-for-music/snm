export default interface IPlaylistPreview {
    _id: string;
    owner: {
        _id: string;
        
        username: string;
    };
    title: string;
    tags: string[];
    public: boolean;
    totalTracks: number;
    followers: string[];
}