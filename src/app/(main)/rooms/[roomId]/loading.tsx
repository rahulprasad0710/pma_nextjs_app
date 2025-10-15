type User = {
    id: number;
    name: string;
    username: string;
    email: string;
};

const UserLoadingPage = async () => {
    return (
        <div>
            <h2>User List</h2>
            <div className='flex gap-4 flex-wrap'>loading</div>
        </div>
    );
};

export default UserLoadingPage;
