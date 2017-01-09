ownsDocument = function(userId, project) {
  return project && project.managerId === userId;
}
