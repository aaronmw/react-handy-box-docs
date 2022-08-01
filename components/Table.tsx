import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { Text } from '@/components/Text';
import sortBy from 'lodash/sortBy';
import { forwardRef, ReactNode, Ref, useEffect, useState } from 'react';

type BaseRowShape = {
  id: string | number;
};

export type ColumnDescriptor<T extends BaseRowShape, K extends keyof T> = {
  cellProps?: Omit<BoxProps<'td'>, 'ref'>;
  columnKey: K;
  customSortFunction?: (args?: {
    rowObjects?: Array<T>;
    sortDirection?: SortDirection;
  }) => Array<T>;
  label: ReactNode;
  initialSortDirection?: SortDirection;
  isSortable?: boolean;
};

type SortDirection = 'ASC' | 'DESC';

type TableProps<
  T extends BaseRowShape,
  K extends keyof T
> = BoxProps<'table'> & {
  columnDescriptors: Array<ColumnDescriptor<T, K>>;
  initialSortedColumnKey?: K;
  rowObjects: Array<T>;
};

const Table = forwardRef(
  <T extends BaseRowShape, K extends keyof T>(
    {
      columnDescriptors,
      initialSortedColumnKey,
      rowObjects,
      ...otherProps
    }: TableProps<T, K>,
    ref: Ref<HTMLTableElement>
  ) => {
    const initiallySortedColumnDescriptor = columnDescriptors.find(
      (columnDescriptor) =>
        columnDescriptor.columnKey === initialSortedColumnKey
    );

    const [sortDirection, setSortDirection] = useState<SortDirection>(
      initiallySortedColumnDescriptor?.initialSortDirection ?? 'ASC'
    );

    const [sortedColumnDescriptor, setSortedColumnDescriptor] = useState<
      ColumnDescriptor<T, K> | undefined
    >(initiallySortedColumnDescriptor);

    const [sortedAndFilteredRowObjects, setSortedAndFilteredRowObjects] =
      useState<Array<T>>(rowObjects);

    useEffect(() => {
      if (!sortedColumnDescriptor) {
        setSortedAndFilteredRowObjects(rowObjects);
        return;
      }

      const defaultSortFunction = (rowObjects: Array<T>) =>
        sortBy(rowObjects, sortedColumnDescriptor.columnKey);

      const sortFunction =
        sortedColumnDescriptor?.customSortFunction ?? defaultSortFunction;

      const sortedRowObjects = sortFunction(rowObjects);

      if (sortDirection === 'DESC') {
        sortedRowObjects.reverse();
      }

      setSortedAndFilteredRowObjects(sortedRowObjects);
    }, [rowObjects, sortDirection, sortedColumnDescriptor]);

    const handleClickColumnHeading = (
      columnDescriptor: ColumnDescriptor<T, K>,
      event: MouseEvent
    ) => {
      event.preventDefault();

      setSortedColumnDescriptor((currentSortedColumnDescriptor) => {
        if (
          currentSortedColumnDescriptor &&
          columnDescriptor.columnKey === currentSortedColumnDescriptor.columnKey
        ) {
          setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
        } else {
          setSortDirection(columnDescriptor.initialSortDirection || 'ASC');
        }

        return columnDescriptor;
      });
    };

    return (
      <Box
        as="table"
        backgroundColor="white"
        border="normal"
        borderColor="white"
        borderRadius="small"
        cellPadding={0}
        cellSpacing={0}
        overflow="hidden"
        ref={ref}
        width="100%"
        {...otherProps}
      >
        <Box as="thead">
          <Box as="tr">
            {columnDescriptors.map((columnDescriptor) => (
              <Box
                as="th"
                borderBottom="hairline"
                cursor="pointer"
                key={String(columnDescriptor.columnKey)}
                paddingX="normal"
                paddingY="xtight"
                textAlign={columnDescriptor.cellProps?.textAlign}
                onClick={
                  handleClickColumnHeading.bind(null, columnDescriptor) as any
                }
              >
                <Text color="textFaded" variant="label">
                  {columnDescriptor.label}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>

        <Box as="tbody">
          {sortedAndFilteredRowObjects.map((rowObject, index) => (
            <Box
              as="tr"
              backgroundColor={index % 2 === 0 ? 'shaded' : undefined}
              key={rowObject.id}
              propsOnHover={{
                backgroundColor: 'shaded',
              }}
            >
              {columnDescriptors.map((columnDescriptor) => (
                <Box
                  as="td"
                  key={String(columnDescriptor.columnKey)}
                  paddingX="normal"
                  paddingY="xtight"
                  {...columnDescriptor?.cellProps}
                >
                  {rowObject[columnDescriptor.columnKey] as any}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
);

Table.displayName = 'Table';

export { Table };
