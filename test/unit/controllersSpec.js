/**
 * TODO(vojta) Extract all service interface related code (urls, response structures, etc)
 * into one place, so that we can easily maintain it.
 * 
 * ? Script for fetching / updating latest API from real service, so we can do integration test
 * with the REST service whenever it changes
 */
describe('TicketListCtrl', function() {
  var ctrl, ticket1, ticket2, author1, author2;

  beforeEach(function() {
    var scope = angular.scope();

    ticket1 = {id: 't1', author: '/url-auth1'};
    ticket2 = {id: 't2', author: '/url-auth2'};
    author1 = {};
    author2 = {};

    var xhr = scope.$service('$browser').xhr;
    xhr.expectGET(SERVICE_URL).respond({tickets: '/ticket-url'});
    xhr.expectGET('/ticket-url').respond({items: ['/url1', '/url2']});
    xhr.expectGET('/url1').respond(ticket1);
    xhr.expectGET('/url2').respond(ticket2);
    xhr.expectGET('/url-auth1').respond(author1);
    xhr.expectGET('/url-auth2').respond(author2);

    ctrl = scope.$new(TicketListCtrl);
    xhr.flush();
  });

  it('should load all tickets', function() {
    expect(ctrl.tickets).toBeDefined();
    expect(ctrl.tickets.items.length).toBe(2);
  });

  it('should load ticket details', function() {
    expect(ctrl.tickets.items[0].id).toEqual(ticket1.id);
    expect(ctrl.tickets.items[0].author).toEqual(ticket1.author);
    expect(ctrl.tickets.items[1].id).toEqual(ticket2.id);
    expect(ctrl.tickets.items[1].author).toEqual(ticket2.author);
  });

  it('should load author details', function() {
    expect(ctrl.tickets.items[0].Author).toBe(author1);
    expect(ctrl.tickets.items[1].Author).toBe(author2);
  });
});

describe('ProjectListCtrl', function() {
  var ctrl, ticket1, ticket2, author1, author2;

  beforeEach(function() {
    var scope = angular.scope();

    project1 = {name: 'p1', description: '....'};
    project2 = {name: 'p2', description: '...'};

    var xhr = scope.$service('$browser').xhr;
    xhr.expectGET(SERVICE_URL).respond({project: '/projects-url'});
    xhr.expectGET('/projects-url').respond({items: ['/prj1', '/prj2']});
    xhr.expectGET('/prj1').respond(project1);
    xhr.expectGET('/prj2').respond(project2);

    ctrl = scope.$new(ProjectListCtrl);
    xhr.flush();
  });

  it('should load all projects', function() {
    expect(ctrl.projects).toBeDefined();
    expect(ctrl.projects.items.length).toBe(2);
  });

  it('should load project details', function() {
    expect(ctrl.projects.items[0].name).toEqual(project1.name);
    expect(ctrl.projects.items[0].description).toEqual(project1.description);
    expect(ctrl.projects.items[1].name).toEqual(project2.name);
    expect(ctrl.projects.items[1].description).toEqual(project2.description);
  });
});
