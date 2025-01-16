<?php 
namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $user = $event->getUser(); // Authenticated user
        if (!$user) {
            return;
        }

        $payload = $event->getData();
        $payload['name'] = $user->getName();
        $payload['username'] = $user->getUsername();

        $event->setData($payload);
    }
}
