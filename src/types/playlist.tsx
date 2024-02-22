export default interface IPlaylist {
    _id: string;
    owner: {
        _id: string;
        
        username: string;
    };
    title: string;
    description: string;
    tags: string[];
    public: boolean;
    tracks: any[];
    followers: string[];
}