import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { Text } from '@/react-handy-box/components/Text';
import sortBy from 'lodash/sortBy';
import { forwardRef, ReactNode, Ref, useEffect, useState } from 'react';

type BaseRowShape = {
  id: string | number;
};

export type ColumnDescriptor<T extends BaseRowShape, K extends keyof T> = {
  columnKey: K;
  customSortFunction?: (args?: {
    rowObjects?: Array<T>;
    sortDirection?: SortDirection;
  }) => Array<T>;
  initialSortDirection?: SortDirection;
  isSortable?: boolean;
  label: ReactNode;
  propsForCell?: BoxProps<'td'>;
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
      styles,
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
        ref={ref}
        styles={{
          backgroundColor: 'white',
          border: 'normal',
          borderColor: 'white',
          borderCollapse: 'collapse',
          borderRadius: 'small',
          overflow: 'hidden',
          width: '100%',
          ...styles,
        }}
        {...otherProps}
      >
        <Box as="thead">
          <Box as="tr">
            {columnDescriptors.map((columnDescriptor) => (
              <Box
                as="th"
                key={String(columnDescriptor.columnKey)}
                styles={{
                  borderBottom: 'hairline',
                  cursor: 'pointer',
                  paddingX: 'tight',
                  paddingY: 'xxtight',
                  textAlign: columnDescriptor.propsForCell?.styles?.textAlign,
                }}
                onClick={
                  handleClickColumnHeading.bind(null, columnDescriptor) as any
                }
              >
                <Text
                  styles={{
                    color: 'textFaded',
                  }}
                  variant="label"
                >
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
              key={rowObject.id}
              styles={{
                backgroundColor: index % 2 === 0 ? 'shaded' : undefined,
                propsOnHover: {
                  backgroundColor: 'shaded',
                },
              }}
            >
              {columnDescriptors.map((columnDescriptor) => (
                <Box
                  as="td"
                  key={String(columnDescriptor.columnKey)}
                  {...columnDescriptor?.propsForCell}
                  styles={{
                    paddingX: 'tight',
                    paddingY: 'xxtight',
                    ...columnDescriptor?.propsForCell?.styles,
                  }}
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
