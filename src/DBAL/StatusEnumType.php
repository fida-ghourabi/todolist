<?php
// src/DBAL/StatusEnumType.php
namespace App\DBAL;

class StatusEnumType extends EnumType
{
    public const COMPLETED = 'completed';
    public const STARTED = 'started';
    public const PENDING = 'pending';

    protected static string $name = 'status_enum';
}
