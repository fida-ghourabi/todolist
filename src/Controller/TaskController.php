<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Task;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\TaskRepository;
use App\DBAL\StatusEnumType;
use App\DBAL\PriorityEnumType;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/api', name: 'api_')]
class TaskController extends AbstractController
{
    private $taskRepository;
    private $entityManager;
    private $serializer;

    public function __construct(TaskRepository $taskRepository, EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {   
        $this->taskRepository = $taskRepository;
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    #[Route('/tasks', name: 'create_task', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $task = new Task();
        $task->setDescription($data['description']);
        $task->setStatus($data['status']);
        $task->setPriority($data['priority']);
        $task->setTag($data['tag'] ?? null);
        $task->setCreatedAt(new \DateTimeImmutable());

        // Set the deadline if provided in the request
        if (isset($data['deadline'])) {
            $task->setDeadline(new \DateTimeImmutable($data['deadline']));
        }

        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $task->setUserId($user);

        $this->entityManager->persist($task);
        $this->entityManager->flush();

        return new JsonResponse($this->serializer->normalize($task), JsonResponse::HTTP_CREATED);
    }

    #[Route('/tasks', name: 'get_tasks', methods: ['GET'])]
    public function getTasks(Request $request): JsonResponse
    {
        // Get the authenticated user
        $user = $this->getUser();

        // Fetch the tasks for the authenticated user
        $tasks = $this->taskRepository->findBy(['user_id' => $user]);

        // Transform the tasks into an array to send in the response
        $taskData = array_map(function (Task $task) {
            return [
                'id' => $task->getId(),
                'description' => $task->getDescription(),
                'tag' => $task->getTag(),
                'created_at' => $task->getCreatedAt()->format('Y-m-d H:i:s'),
                'priority' => $task->getPriority(),
                'status' => $task->getStatus(),
                'deadline' => $task->getDeadline() ? $task->getDeadline()->format('Y-m-d H:i:s') : null,  // Include deadline
            ];
        }, $tasks);

        // Return a JSON response
        return $this->json([
            'tasks' => $taskData
        ]);
    }

    #[Route('/tasks/status/{status}', name: 'get_tasks_by_status', methods: ['GET'])]
    public function getTasksByStatus(string $status, Request $request): JsonResponse
    {
        // Get the authenticated user
        $user = $this->getUser();

        // Validate if the status is one of the allowed values
        $validStatuses = ['completed', 'started', 'pending']; // Define the valid statuses
        if (!in_array($status, $validStatuses)) {
            return new JsonResponse(['error' => 'Invalid status'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Fetch the tasks for the authenticated user filtered by status
        $tasks = $this->taskRepository->findBy(['user_id' => $user, 'status' => $status]);

        // Transform the tasks into an array to send in the response
        $taskData = array_map(function (Task $task) {
            return [
                'id' => $task->getId(),
                'description' => $task->getDescription(),
                'tag' => $task->getTag(),
                'created_at' => $task->getCreatedAt()->format('Y-m-d H:i:s'),
                'priority' => $task->getPriority(),
                'status' => $task->getStatus(),
                'deadline' => $task->getDeadline() ? $task->getDeadline()->format('Y-m-d H:i:s') : null, // Include deadline
            ];
        }, $tasks);

        // Return a JSON response
        return $this->json([
            'tasks' => $taskData
        ]);
    }

    #[Route('/tasks/priority/{priority}', name: 'get_tasks_by_priority', methods: ['GET'])]
    public function getTasksByPriority(string $priority, Request $request): JsonResponse
    {
        // Get the authenticated user
        $user = $this->getUser();

        // Validate if the priority is one of the allowed values
        $validPriorities = ['low', 'medium', 'high']; // Define the valid priorities
        if (!in_array($priority, $validPriorities)) {
            return new JsonResponse(['error' => 'Invalid priority'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Fetch the tasks for the authenticated user filtered by priority
        $tasks = $this->taskRepository->findBy(['user_id' => $user, 'priority' => $priority]);

        // Transform the tasks into an array to send in the response
        $taskData = array_map(function (Task $task) {
            return [
                'id' => $task->getId(),
                'description' => $task->getDescription(),
                'tag' => $task->getTag(),
                'created_at' => $task->getCreatedAt()->format('Y-m-d H:i:s'),
                'priority' => $task->getPriority(),
                'status' => $task->getStatus(),
                'deadline' => $task->getDeadline() ? $task->getDeadline()->format('Y-m-d H:i:s') : null, // Include deadline
            ];
        }, $tasks);

        // Return a JSON response
        return $this->json([
            'tasks' => $taskData
        ]);
    }
    #[Route('/tasks/modify/{id}', name: 'modify_task', methods: ['POST'])]
public function modify(int $id, Request $request): JsonResponse
{
    // Decode the request JSON
    $data = json_decode($request->getContent(), true);
    
    // Find the task by its ID
    $task = $this->taskRepository->find($id);

    if (!$task) {
        return new JsonResponse(['error' => 'Task not found'], JsonResponse::HTTP_NOT_FOUND);
    }

    // Check if the task belongs to the authenticated user (Optional)
    $user = $this->getUser();
    if ($task->getUserId() !== $user) {
        return new JsonResponse(['error' => 'Unauthorized'], JsonResponse::HTTP_UNAUTHORIZED);
    }

    // Update task fields with the incoming data
    if (isset($data['description'])) {
        $task->setDescription($data['description']);
    }
    if (isset($data['status'])) {
        $task->setStatus($data['status']);
    }
    if (isset($data['priority'])) {
        $task->setPriority($data['priority']);
    }
    if (isset($data['tag'])) {
        $task->setTag($data['tag']);
    }
    if (isset($data['deadline'])) {
        $task->setDeadline(new \DateTimeImmutable($data['deadline']));
    }

    // Persist the updated task to the database
    $this->entityManager->flush();

    // Return the updated task as a JSON response
    return new JsonResponse($this->serializer->normalize($task), JsonResponse::HTTP_OK);
}
#[Route('/tasks/delete/{id}', name: 'delete_task', methods: ['GET'])]
public function delete(int $id): JsonResponse
{
    // Find the task by its ID
    $task = $this->taskRepository->find($id);

    if (!$task) {
        return new JsonResponse(['error' => 'Task not found'], JsonResponse::HTTP_NOT_FOUND);
    }

    // Check if the task belongs to the authenticated user (Optional)
    $user = $this->getUser();
    if ($task->getUserId() !== $user) {
        return new JsonResponse(['error' => 'Unauthorized'], JsonResponse::HTTP_UNAUTHORIZED);
    }

    // Remove the task from the database
    $this->entityManager->remove($task);
    $this->entityManager->flush();

    // Return a success message
    return new JsonResponse(['message' => 'Task deleted successfully'], JsonResponse::HTTP_OK);
}

}
