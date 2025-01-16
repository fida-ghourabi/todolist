<?php


 namespace App\Controller;
 
 use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
 use Symfony\Component\HttpFoundation\JsonResponse;
 use Symfony\Component\Routing\Attribute\Route;
 use Symfony\Component\HttpFoundation\Request;
 use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
 use Doctrine\Persistence\ManagerRegistry;
 use App\Entity\User;
 use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface; // Import the interface
 
 #[Route('/api', name: 'api_')]
 class RegistrationController extends AbstractController
 {
     private JWTTokenManagerInterface $jwtManager;
 
     // Inject JWTTokenManagerInterface via the constructor
     public function __construct(JWTTokenManagerInterface $jwtManager)
     {
         $this->jwtManager = $jwtManager;
     }
 
     #[Route('/register', name: 'register', methods: 'post')]
     public function register(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
     {
         $em = $doctrine->getManager();
         $decoded = json_decode($request->getContent());
         
         // Update field mapping
         $username = $decoded->username; // Now this is the email
         $name = $decoded->name; // Now this is the username
         $plaintextPassword = $decoded->password;
 
         $user = new User();
         $hashedPassword = $passwordHasher->hashPassword(
             $user,
             $plaintextPassword
         );
         
         // Set updated fields
         $user->setPassword($hashedPassword);
         $user->setUsername($username); // Save the email as "username"
         $user->setName($name); // Save the username as "name"
         
         $em->persist($user);
         $em->flush();
 
         return $this->json(['message' => 'Registered Successfully']);
     }
 
     #[Route('/login', name: 'login', methods: 'post')]
     public function login(Request $request, ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher): JsonResponse
     {
         $data = json_decode($request->getContent(), true);
 
         $username = $data['username'] ?? null; // This corresponds to the email field
         $password = $data['password'] ?? null;
 
         if (!$username || !$password) {
             return $this->json(['error' => 'Username and password are required'], 400);
         }
 
         // Fetch user by "username" (which is now email)
         $user = $doctrine->getRepository(User::class)->findOneBy(['username' => $username]);
 
         if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
             return $this->json(['error' => 'Invalid credentials'], 401);
         }
 
         // Manually create the token using JWTManager
         $token = $this->jwtManager->create($user);
 
         return $this->json([
             'token' => $token,
             'user' => [
                 'id' => $user->getId(),
                 'name' => $user->getName(), // Retrieve the username
                 'username' => $user->getUsername() // Retrieve the email
             ]
         ]);
     }
 }
 