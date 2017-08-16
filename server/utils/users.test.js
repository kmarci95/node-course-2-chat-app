const expect = require('expect');
const {Users} = require('./users');

describe('User', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'maik',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'mike',
            room: 'js'
        }, {
            id: '3',
            name: 'jule',
            room: 'html'
        }];
    });
    it('should return names for node courses', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['maik']);
    });
    it('should return names for html', () => {
        var userList = users.getUserList('html');
        expect(userList).toEqual(['jule']);
    });
    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });
    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });
    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    it('should not remove a user', () => {
        var userId = '99';
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    })
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Marci',
            room: 'got'
        };
        var responseUser = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    });
});

