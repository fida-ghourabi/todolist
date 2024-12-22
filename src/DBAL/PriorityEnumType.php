<?php
// src/DBAL/PriorityEnumType.php
namespace App\DBAL;

class PriorityEnumType extends EnumType
{
    public const LOW = 'low';
    public const MEDIUM = 'medium';
    public const HIGH = 'high';

    protected static string $name = 'priority_enum';
}
