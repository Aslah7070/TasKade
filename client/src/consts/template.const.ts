// export const templateList = [
//   {
//     name: "Basic To-Do Template",
//     description:
//       "A simple template for users who need a basic task management system.",
//     spaces: [
//       {
//         name: "Personal Tasks",
//         description: "Tasks for personal projects and goals.",
//         lists: [
//           { name: "To-Do", color: "#f4b400" },
//           { name: "In Progress", color: "#0f9d58" },
//           { name: "Completed", color: "#34a853" },
//         ],
//       },
//       {
//         name: "Work Projects",
//         description: "Tasks for work-related projects.",
//         lists: [
//           { name: "To-Do", color: "#fbbc05" },
//           { name: "In Progress", color: "#4285f4" },
//           { name: "Completed", color: "#0f9d58" },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Kanban Board Template",
//     description: "For teams or individuals using the Kanban method.",
//     spaces: [
//       {
//         name: "Development",
//         description: "Development-related tasks for a project.",
//         lists: [
//           { name: "Backlog", color: "#e67e22" },
//           { name: "To-Do", color: "#f39c12" },
//           { name: "In Progress", color: "#2980b9" },
//           { name: "Done", color: "#27ae60" },
//         ],
//       },
//       {
//         name: "Design",
//         description: "Design tasks for various projects.",
//         lists: [
//           { name: "Backlog", color: "#e74c3c" },
//           { name: "To-Do", color: "#f1c40f" },
//           { name: "In Progress", color: "#3498db" },
//           { name: "Done", color: "#2ecc71" },
//         ],
//       },
//       {
//         name: "Marketing",
//         description: "Tasks related to marketing strategies and campaigns.",
//         lists: [
//           { name: "Backlog", color: "#9b59b6" },
//           { name: "To-Do", color: "#f39c12" },
//           { name: "In Progress", color: "#2980b9" },
//           { name: "Done", color: "#27ae60" },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Agile Sprint Template",
//     description: "An Agile-based template for managing sprint tasks.",
//     spaces: [
//       {
//         name: "Current Sprint",
//         description: "Tasks for the ongoing sprint.",
//         lists: [
//           { name: "Sprint Planning", color: "#e67e22" },
//           { name: "In Progress", color: "#2980b9" },
//           { name: "Blocked", color: "#e74c3c" },
//           { name: "Done", color: "#27ae60" },
//         ],
//       },
//       {
//         name: "Backlog",
//         description: "All tasks awaiting assignment to future sprints.",
//         lists: [
//           { name: "Sprint Planning", color: "#f1c40f" },
//           { name: "In Progress", color: "#3498db" },
//           { name: "Blocked", color: "#e74c3c" },
//           { name: "Done", color: "#2ecc71" },
//         ],
//       },
//       {
//         name: "Retrospective",
//         description: "Lessons learned and feedback from the sprint.",
//         lists: [
//           { name: "Sprint Planning", color: "#f39c12" },
//           { name: "In Progress", color: "#2980b9" },
//           { name: "Blocked", color: "#e74c3c" },
//           { name: "Done", color: "#27ae60" },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Project Management Template",
//     description: "A more structured template for complex projects.",
//     spaces: [
//       {
//         name: "Project Planning",
//         description: "Initial planning and ideation for the project.",
//         lists: [
//           { name: "Task Ideas", color: "#e67e22" },
//           { name: "Assigned Tasks", color: "#3498db" },
//           { name: "In Progress", color: "#2980b9" },
//           { name: "Awaiting Review", color: "#f1c40f" },
//           { name: "Done", color: "#27ae60" },
//         ],
//       },
//       {
//         name: "Development",
//         description: "Development tasks and features implementation.",
//         lists: [
//           { name: "Task Ideas", color: "#f39c12" },
//           { name: "Assigned Tasks", color: "#3498db" },
//           { name: "In Progress", color: "#2980b9" },
//           { name: "Awaiting Review", color: "#f1c40f" },
//           { name: "Done", color: "#27ae60" },
//         ],
//       },
//       {
//         name: "QA Testing",
//         description: "Quality assurance tasks for bug testing.",
//         lists: [
//           { name: "Task Ideas", color: "#e74c3c" },
//           { name: "Assigned Tasks", color: "#3498db" },
//           { name: "In Progress", color: "#2980b9" },
//           { name: "Awaiting Review", color: "#f1c40f" },
//           { name: "Done", color: "#27ae60" },
//         ],
//       },
//       {
//         name: "Deployment",
//         description: "Final deployment and post-deployment tasks.",
//         lists: [
//           { name: "Task Ideas", color: "#e67e22" },
//           { name: "Assigned Tasks", color: "#3498db" },
//           { name: "In Progress", color: "#2980b9" },
//           { name: "Awaiting Review", color: "#f1c40f" },
//           { name: "Done", color: "#27ae60" },
//         ],
//       },
//     ],
//   },
//   // Add the remaining templates in similar format...
// ];

export type Template = {
  name: string;
  description: string;
  spaces: {
    name: string;
    description: string;
    lists: {
      name: string;
      color:{
        bg:string,
        text:string
      }
    }[];
  }[];
};





export const templateList = [
  {
    name: "Basic To-Do Template",
    description:
      "A simple template for users who need a basic task management system.",
    spaces: [
      {
        name: "Personal Tasks",
        description: "Tasks for personal projects and goals.",
        lists: [
          { name: "To-Do", color: { bg: "#f4b400", text: "#000000" } },
          { name: "In Progress", color: { bg: "#0f9d58", text: "#ffffff" } },
          { name: "Completed", color: { bg: "#34a853", text: "#ffffff" } },
        ],
      },
      // {
      //   name: "Work Projects",
      //   description: "Tasks for work-related projects.",
      //   lists: [
      //     { name: "To-Do", color: { bg: "#fbbc05", text: "#000000" } },
      //     { name: "In Progress", color: { bg: "#4285f4", text: "#ffffff" } },
      //     { name: "Completed", color: { bg: "#0f9d58", text: "#ffffff" } },
      //   ],
      // },
    ],
  },
  {
    name: "Kanban Board Template",
    description: "For teams or individuals using the Kanban method.",
    spaces: [
      {
        name: "Development",
        description: "Development-related tasks for a project.",
        lists: [
          { name: "Backlog", color: { bg: "#e67e22", text: "#ffffff" } },
          { name: "To-Do", color: { bg: "#f39c12", text: "#000000" } },
          { name: "In Progress", color: { bg: "#2980b9", text: "#ffffff" } },
          { name: "Done", color: { bg: "#27ae60", text: "#ffffff" } },
        ],
      },
      // {
      //   name: "Design",
      //   description: "Design tasks for various projects.",
      //   lists: [
      //     { name: "Backlog", color: { bg: "#e74c3c", text: "#ffffff" } },
      //     { name: "To-Do", color: { bg: "#f1c40f", text: "#000000" } },
      //     { name: "In Progress", color: { bg: "#3498db", text: "#ffffff" } },
      //     { name: "Done", color: { bg: "#2ecc71", text: "#ffffff" } },
      //   ],
      // },
      // {
      //   name: "Marketing",
      //   description: "Tasks related to marketing strategies and campaigns.",
      //   lists: [
      //     { name: "Backlog", color: { bg: "#9b59b6", text: "#ffffff" } },
      //     { name: "To-Do", color: { bg: "#f39c12", text: "#000000" } },
      //     { name: "In Progress", color: { bg: "#2980b9", text: "#ffffff" } },
      //     { name: "Done", color: { bg: "#27ae60", text: "#ffffff" } },
      //   ],
      // },
    ],
  },
  {
    name: "Agile Sprint Template",
    description: "An Agile-based template for managing sprint tasks.",
    spaces: [
      {
        name: "Current Sprint",
        description: "Tasks for the ongoing sprint.",
        lists: [
          { name: "Sprint Planning", color: { bg: "#e67e22", text: "#ffffff" } },
          { name: "In Progress", color: { bg: "#2980b9", text: "#ffffff" } },
          { name: "Blocked", color: { bg: "#e74c3c", text: "#ffffff" } },
          { name: "Done", color: { bg: "#27ae60", text: "#ffffff" } },
        ],
      },
      // {
      //   name: "Backlog",
      //   description: "All tasks awaiting assignment to future sprints.",
      //   lists: [
      //     { name: "Sprint Planning", color: { bg: "#f1c40f", text: "#000000" } },
      //     { name: "In Progress", color: { bg: "#3498db", text: "#ffffff" } },
      //     { name: "Blocked", color: { bg: "#e74c3c", text: "#ffffff" } },
      //     { name: "Done", color: { bg: "#2ecc71", text: "#ffffff" } },
      //   ],
      // },
      // {
      //   name: "Retrospective",
      //   description: "Lessons learned and feedback from the sprint.",
      //   lists: [
      //     { name: "Sprint Planning", color: { bg: "#f39c12", text: "#000000" } },
      //     { name: "In Progress", color: { bg: "#2980b9", text: "#ffffff" } },
      //     { name: "Blocked", color: { bg: "#e74c3c", text: "#ffffff" } },
      //     { name: "Done", color: { bg: "#27ae60", text: "#ffffff" } },
      //   ],
      // },
    ],
  },
  {
    name: "Project Management Template",
    description: "A more structured template for complex projects.",
    spaces: [
      {
        name: "Project Planning",
        description: "Initial planning and ideation for the project.",
        lists: [
          { name: "Task Ideas", color: { bg: "#e67e22", text: "#ffffff" } },
          { name: "Assigned Tasks", color: { bg: "#3498db", text: "#ffffff" } },
          { name: "In Progress", color: { bg: "#2980b9", text: "#ffffff" } },
          { name: "Awaiting Review", color: { bg: "#f1c40f", text: "#000000" } },
          { name: "Done", color: { bg: "#27ae60", text: "#ffffff" } },
        ],
      },
      // {
      //   name: "Development",
      //   description: "Development tasks and features implementation.",
      //   lists: [
      //     { name: "Task Ideas", color: { bg: "#f39c12", text: "#000000" } },
      //     { name: "Assigned Tasks", color: { bg: "#3498db", text: "#ffffff" } },
      //     { name: "In Progress", color: { bg: "#2980b9", text: "#ffffff" } },
      //     { name: "Awaiting Review", color: { bg: "#f1c40f", text: "#000000" } },
      //     { name: "Done", color: { bg: "#27ae60", text: "#ffffff" } },
      //   ],
      // },
      // {
      //   name: "QA Testing",
      //   description: "Quality assurance tasks for bug testing.",
      //   lists: [
      //     { name: "Task Ideas", color: { bg: "#e74c3c", text: "#ffffff" } },
      //     { name: "Assigned Tasks", color: { bg: "#3498db", text: "#ffffff" } },
      //     { name: "In Progress", color: { bg: "#2980b9", text: "#ffffff" } },
      //     { name: "Awaiting Review", color: { bg: "#f1c40f", text: "#000000" } },
      //     { name: "Done", color: { bg: "#27ae60", text: "#ffffff" } },
      //   ],
      // },
      // {
      //   name: "Deployment",
      //   description: "Final deployment and post-deployment tasks.",
      //   lists: [
      //     { name: "Task Ideas", color: { bg: "#e67e22", text: "#ffffff" } },
      //     { name: "Assigned Tasks", color: { bg: "#3498db", text: "#ffffff" } },
      //     { name: "In Progress", color: { bg: "#2980b9", text: "#ffffff" } },
      //     { name: "Awaiting Review", color: { bg: "#f1c40f", text: "#000000" } },
      //     { name: "Done", color: { bg: "#27ae60", text: "#ffffff" } },
      //   ],
      // },
    ],
  },
];
