// ══════════════════════════════════════════
// DATABASE SEED SCRIPT
// Add test data with inventory, inspection, and onboarding records
// ══════════════════════════════════════════

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Sample inventory record
const sampleInventory = {
  type: 'inventory',
  unitId: 'inv-unit-101',
  unitName: 'Departamento 101 - Piso 3',
  auditor: 'Juan García',
  date: '2026-04-10',
  duration: '45 min',
  durationMs: 2700000,
  rooms: [
    {
      roomId: 'living',
      roomName: 'Sala/Living',
      items: [
        { name: 'Sofá 3 cuerpos', status: true, notes: 'Buen estado, tela sin rasgaduras' },
        { name: 'Mesita de centro', status: true, notes: 'Cristal sin daños' },
        { name: 'Lámparas de piso', status: true, notes: 'Ambas funcionando' },
        { name: 'Cortinas', status: true, notes: 'Completas y sin defectos' },
      ]
    },
    {
      roomId: 'kitchen',
      roomName: 'Cocina',
      items: [
        { name: 'Refrigerador', status: true, notes: 'Funcionando correctamente' },
        { name: 'Estufa', status: true, notes: '4 quemadores operativos' },
        { name: 'Microondas', status: true, notes: 'Panel de control funcional' },
        { name: 'Muebles de cocina', status: true, notes: 'Puertas sin defectos' },
        { name: 'Encimera', status: true, notes: 'Granito sin grietas' },
      ]
    },
    {
      roomId: 'bedroom-1',
      roomName: 'Dormitorio Principal',
      items: [
        { name: 'Cama queen', status: true, notes: 'Base y colchón en buen estado' },
        { name: 'Buró izquierdo', status: true, notes: 'Cajones funcionan correctamente' },
        { name: 'Buró derecho', status: true, notes: 'Superficie sin daños' },
        { name: 'Closet empotrado', status: true, notes: 'Espejos intactos' },
      ]
    },
    {
      roomId: 'bathroom',
      roomName: 'Baño',
      items: [
        { name: 'WC', status: true, notes: 'Asiento limpio, descarga correcta' },
        { name: 'Lavamanos', status: true, notes: 'Grifería sin fugas' },
        { name: 'Regadera', status: true, notes: 'Presión de agua normal' },
        { name: 'Espejo', status: true, notes: 'Sin manchas o daños' },
      ]
    }
  ],
  createdAt: new Date('2026-04-10T09:00:00'),
  updatedAt: new Date('2026-04-10T10:00:00')
};

// Sample inspection record (follow-up on inventory)
const sampleInspection = {
  type: 'inspection',
  unitId: 'insp-unit-101',
  sourceUnitId: 'inv-unit-101',
  unitName: 'Departamento 101 - Piso 3',
  location: 'Departamento 101 - Piso 3',
  auditor: 'María López',
  date: '2026-04-12',
  duration: '30 min',
  durationMs: 1800000,
  rooms: [
    {
      roomId: 'living',
      roomName: 'Sala/Living',
      items: [
        { name: 'Sofá 3 cuerpos', status: true, notes: 'Sin cambios' },
        { name: 'Mesita de centro', status: false, notes: 'Ligero rayón en el cristal' },
        { name: 'Lámparas de piso', status: true, notes: 'Funcionando' },
        { name: 'Cortinas', status: true, notes: 'Sin problemas' },
      ]
    },
    {
      roomId: 'kitchen',
      roomName: 'Cocina',
      items: [
        { name: 'Refrigerador', status: true, notes: 'OK' },
        { name: 'Estufa', status: true, notes: 'OK' },
        { name: 'Microondas', status: true, notes: 'OK' },
        { name: 'Muebles de cocina', status: true, notes: 'OK' },
        { name: 'Encimera', status: true, notes: 'OK' },
      ]
    },
    {
      roomId: 'bedroom-1',
      roomName: 'Dormitorio Principal',
      items: [
        { name: 'Cama queen', status: true, notes: 'Buen estado' },
        { name: 'Buró izquierdo', status: true, notes: 'OK' },
        { name: 'Buró derecho', status: true, notes: 'OK' },
        { name: 'Closet empotrado', status: true, notes: 'OK' },
      ]
    },
    {
      roomId: 'bathroom',
      roomName: 'Baño',
      items: [
        { name: 'WC', status: true, notes: 'OK' },
        { name: 'Lavamanos', status: true, notes: 'Pequeña fuga que requiere reparación' },
        { name: 'Regadera', status: true, notes: 'OK' },
        { name: 'Espejo', status: true, notes: 'OK' },
      ]
    }
  ],
  createdAt: new Date('2026-04-12T10:00:00'),
  updatedAt: new Date('2026-04-12T10:30:00')
};

// Sample onboarding record
const sampleOnboarding = {
  type: 'onboarding',
  unitId: 'onb-unit-201',
  unitName: 'Departamento 201 - Piso 4',
  auditor: 'Carlos Rodríguez',
  date: '2026-04-08',
  duration: '2h 15 min',
  durationMs: 8100000,
  sections: [
    {
      sectionId: 'checklist-general',
      sectionName: 'Checklist General',
      groups: [
        {
          groupId: 'g1',
          groupName: 'Acceso',
          items: [
            { itemId: 'i1', itemName: 'Puerta principal', status: true, notes: 'Cerraduras funcionando' },
            { itemId: 'i2', itemName: 'Llaves', status: true, notes: '3 llaves entregadas' },
            { itemId: 'i3', itemName: 'Documentación', status: true, notes: 'Completa' },
          ]
        },
        {
          groupId: 'g2',
          groupName: 'Servicios',
          items: [
            { itemId: 'i4', itemName: 'Agua potable', status: true, notes: 'Presión normal' },
            { itemId: 'i5', itemName: 'Electricidad', status: true, notes: 'Todo funciona' },
            { itemId: 'i6', itemName: 'Gas', status: true, notes: 'Válvula testeada' },
            { itemId: 'i7', itemName: 'WiFi', status: true, notes: 'Router instalado' },
          ]
        }
      ]
    },
    {
      sectionId: 'cocina',
      sectionName: 'Cocina',
      groups: [
        {
          groupId: 'k1',
          groupName: 'Electrodomésticos',
          items: [
            { itemId: 'ki1', itemName: 'Refrigerador', status: true, notes: 'Calibración correcta' },
            { itemId: 'ki2', itemName: 'Estufa', status: true, notes: 'Quemadores probados' },
            { itemId: 'ki3', itemName: 'Microondas', status: true, notes: 'Funcionando' },
          ]
        }
      ]
    },
    {
      sectionId: 'habitacion-1',
      sectionName: 'Habitación 1',
      groups: [
        {
          groupId: 'h1',
          groupName: 'Equipamiento',
          items: [
            { itemId: 'hi1', itemName: 'Cama', status: true, notes: 'Completa con ropa de cama' },
            { itemId: 'hi2', itemName: 'Closet', status: true, notes: 'Perchas incluidas' },
            { itemId: 'hi3', itemName: 'Lámpara', status: true, notes: 'Funcionando' },
          ]
        }
      ]
    },
    {
      sectionId: 'bano-1',
      sectionName: 'Baño 1',
      groups: [
        {
          groupId: 'b1',
          groupName: 'Accesorios',
          items: [
            { itemId: 'bi1', itemName: 'Toallero', status: true, notes: 'Instalado' },
            { itemId: 'bi2', itemName: 'Espejo', status: true, notes: 'Limpio' },
            { itemId: 'bi3', itemName: 'Regadera', status: true, notes: 'Presión normal' },
          ]
        }
      ]
    }
  ],
  createdAt: new Date('2026-04-08T08:00:00'),
  updatedAt: new Date('2026-04-08T10:15:00')
};

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with test data...\n');

    // Insert inventory record
    const invQuery = `
      INSERT INTO inventories (unit_id, unit_name, auditor, data, updated_at)
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (unit_id) DO UPDATE SET
        unit_name = EXCLUDED.unit_name,
        auditor = EXCLUDED.auditor,
        data = EXCLUDED.data,
        updated_at = NOW();
    `;

    await pool.query(invQuery, [
      sampleInventory.unitId,
      sampleInventory.unitName,
      sampleInventory.auditor,
      JSON.stringify(sampleInventory)
    ]);
    console.log('✅ Inventory record created:');
    console.log(`   📍 Unit: ${sampleInventory.unitName}`);
    console.log(`   👤 Auditor: ${sampleInventory.auditor}`);
    console.log(`   📅 Date: ${sampleInventory.date}\n`);

    // Insert inspection record
    await pool.query(invQuery, [
      sampleInspection.unitId,
      sampleInspection.unitName,
      sampleInspection.auditor,
      JSON.stringify(sampleInspection)
    ]);
    console.log('✅ Inspection record created:');
    console.log(`   📍 Unit: ${sampleInspection.unitName}`);
    console.log(`   👤 Auditor: ${sampleInspection.auditor}`);
    console.log(`   📅 Date: ${sampleInspection.date}`);
    console.log(`   🔗 Linked to: ${sampleInspection.sourceUnitId}\n`);

    // Insert onboarding record
    await pool.query(invQuery, [
      sampleOnboarding.unitId,
      sampleOnboarding.unitName,
      sampleOnboarding.auditor,
      JSON.stringify(sampleOnboarding)
    ]);
    console.log('✅ Onboarding record created:');
    console.log(`   📍 Unit: ${sampleOnboarding.unitName}`);
    console.log(`   👤 Auditor: ${sampleOnboarding.auditor}`);
    console.log(`   📅 Date: ${sampleOnboarding.date}\n`);

    // Display summary
    const countQuery = `
      SELECT COUNT(*) as total FROM inventories;
    `;
    const countResult = await pool.query(countQuery);
    const totalRecords = countResult.rows[0].total;

    console.log('═══════════════════════════════════════════════');
    console.log('📊 SEED COMPLETE');
    console.log('═══════════════════════════════════════════════');
    console.log(`✨ Total records in database: ${totalRecords}`);
    console.log('\n✅ Test data is ready!');
    console.log('\nTo view the data in the app:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Open http://localhost:3000');
    console.log('3. Click "Histórico" to login with: operaciones123 / Delmar2026');
    console.log('4. You should see the 3 test records');

    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
    await pool.end();
    process.exit(1);
  }
}

seedDatabase();
